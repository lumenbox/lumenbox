const setupLocal = require('./local').setup
const changeCase = require('change-case-object')

module.exports = (passport, pool) => {
  passport.serializeUser((user, done) => done(null, user.id))

  passport.deserializeUser((id, done) => {
    pool.query('select * from "user" where id = $1', [id], (err, res) => {
      done(err, changeCase.camelCase(res.rows[0]))
    })
  })

  setupLocal(passport, pool)
}
