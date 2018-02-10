const path = require('path')
const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const { Pool } = require('pg')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const pgSession = require('connect-pg-simple')(session)
const authorise = require('./passport/authorise')
const passportSetup = require('./passport')

export default config => {
  // create the app
  const app = express()
  if (!config.isTest) {
    app.use(morgan('tiny'))
  }

  // add compression
  app.use(compression())

  // serve static files
  app.use(
    express.static(config.staticPath, {
      fallthrough: true,
      index: false
    })
  )

  // setup cookie and body parsing
  app.use(cookieParser())
  app.use(bodyParser())

  // connect to the db
  const pool = new Pool(config.db)

  // manage sessions
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: config.sessionKey,
      cookie: { maxAge: config.sessionTimeout },
      store: new pgSession({ pool })
    })
  )

  // setup passport authentication
  passportSetup(passport, pool)
  app.use(passport.initialize())
  app.use(passport.session())

  // setup the route handlers
  const load = (dir, args) => {
    fs.readdirSync(path.join(__dirname, dir)).forEach(function(file) {
      const filePath = `${dir}/${file}`
      if (fs.statSync(path.join(__dirname, filePath)).isDirectory()) {
        load(filePath, args)
      } else if (file.endsWith('.js') && !file.endsWith('.test.js')) {
        const { default: setupRoute } = require('./' + filePath)
        setupRoute(args)
      }
    })
  }
  load('routes', { app, pool, passport, config, authorise })

  // return the app
  return app
}
