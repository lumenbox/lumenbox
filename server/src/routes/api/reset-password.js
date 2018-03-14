const sendMail = require('../../sendMail')
const passwordChanged = require('../../mail/passwordChanged')
const RateLimit = require('express-rate-limit')
const changeCase = require('change-case-object')
const hash = require('object-hash')
const { generateHash } = require('../../passport/local')
const config = require('../../config')

const rateLimit = new RateLimit(config.rateLimit.resetPassword)

module.exports = ({ app, pool, config, authorise }) => {
  app.post('/api/reset-password', rateLimit, (req, res) => {
    const { email, token, newPassword } = req.body
    if (!email || !token || !newPassword) {
      return res.sendStatus(401)
    }
    pool.query('select * from "user" where email like $1', [email], (err, result) => {
      if (err) {
        console.error('failed to reset password', err)
        return res.status(500).send({ error: 'Unxpected Error' })
      }
      if (result.rows.length === 0) {
        res.sendStatus(401)
      }
      // accept any token generated today or yesterday so long as the user has not been updated
      const user = changeCase.camelCase(result.rows[0])
      const today = new Date().toDateString()
      const yesterday = (d => {
        d.setDate(d.getDate() - 1)
        return d
      })(new Date()).toDateString()
      if (
        token === hash({ ...user, passwordResetTokenIssued: today }) ||
        token === hash({ ...user, passwordResetTokenIssued: yesterday })
      ) {
        pool.query(
          'update "user" set password_hash = $2, updated_at = now() where id = $1',
          [user.id, generateHash(newPassword)],
          (err, result) => {
            if (err) {
              console.error('failed to reset password', err)
              return res.status(500).send({ error: 'Unxpected Error' })
            }
            sendMail(user, passwordChanged)
            return res.sendStatus(200)
          }
        )
      }
    })
  })
}
