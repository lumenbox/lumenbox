const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const changeCase = require('change-case-object')
const uuid = require('uuid/v4')

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
            'insert into "user" (first_name, last_name, email, password_hash, activation_key) ' +
              'values ($1, $2, $3, $4, $5) returning *',
            [firstName, lastName, email, generateHash(password), uuid()],
            (err, res) => (err ? done(err) : done(null, changeCase.camelCase(res.rows[0])))
          )
        })
      )
    )

    passport.use(
      'local-login',
      new LocalStrategy(localConfig, (req, email, password, done) => {
        if (!password) {
          return done(null, false)
        }
        pool.query('select * from "user" where email like $1', [email], (err, res) => {
          if (err) {
            return done(err)
          }
          const user = changeCase.camelCase(res.rows[0])

          if (
            user &&
            user.activationKey &&
            user.activationKey === req.body.activationKey &&
            verifyHash(password, user.passwordHash)
          ) {
            // activate first time users
            pool.query('update "user" set activation_key = NULL where id = $1', [user.id], (err, res) => {
              if (err) {
                return done(err)
              }
              // auth passed
              done(null, user)
            })
          } else if (!user || user.activationKey || !verifyHash(password, user.passwordHash)) {
            // auth failed
            done(null, false)
          } else {
            // auth passed
            done(null, user)
          }
        })
      })
    )
  }
}
