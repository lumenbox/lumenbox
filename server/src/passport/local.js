const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
const verifyHash = (password, password_hash) => bcrypt.compareSync(password, password_hash)

const localConfig = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // allows us to pass back the entire request to the callback
}

module.exports = (passport, pool, generateHash, verifyHash) => {
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
          return done(null, false)
        }
        pool.query(
          'insert into "user" (email, password_hash) values ($1, $2) returning *',
          [email, generateHash(password)],
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
        const user = res.rows[0]
        if (!user) {
          return done(null, false)
        }
        if (!verifyHash(password, user.password_hash)) {
          return done(null, false)
        }
        return done(null, user)
      })
    })
  )
}
