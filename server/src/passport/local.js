const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const changeCase = require('change-case-object')

const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
const verifyHash = (password, passwordHash) => bcrypt.compareSync(password, passwordHash)

const localConfig = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // allows us to pass back the entire request to the callback
}

module.exports = {
  generateHash,
  verifyHash,
  setup(passport, pool) {
    passport.use(
      'local-signup',
      new LocalStrategy(localConfig, (req, email, password, done) =>
        pool.query('select * from "user" where email like $1', [email], (err, res) => {
          if (err) {
            return done(err)
          }
          const user = res.rows[0]
          // check to see if theres already a user with that email
          if (user) {
            return done(null, false, { message: 'Email address already registered' })
          }
          const { firstName, lastName } = req.body
          pool.query(
            'insert into "user" (first_name, last_name, email, password_hash) values ($1, $2, $3, $4) returning *',
            [firstName, lastName, email, generateHash(password)],
            (err, res) => (err ? done(err) : done(null, res.rows[0]))
          )
        })
      )
    )

    passport.use(
      'local-login',
      new LocalStrategy(localConfig, (req, email, password, done) => {
        pool.query('select * from "user" where email like $1', [email], (err, res) => {
          if (err) {
            return done(err)
          }
          const user = changeCase.camelCase(res.rows[0])
          if (!user) {
            return done(null, false)
          }
          if (!password || !verifyHash(password, user.passwordHash)) {
            return done(null, false)
          }
          return done(null, user)
        })
      })
    )
  }
}
