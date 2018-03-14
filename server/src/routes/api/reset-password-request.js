const sendMail = require('../../sendMail')
const resetPasswordRequest = require('../../mail/resetPasswordRequest')
const RateLimit = require('express-rate-limit')
const changeCase = require('change-case-object')
const hash = require('object-hash')
const config = require('../../config')

const rateLimit = new RateLimit(config.rateLimit.resetPassword)

module.exports = ({ app, pool, config, authorise }) => {
  app.post('/api/reset-password-request', rateLimit, (req, res) => {
    pool.query('select * from "user" where email like $1', [req.body.email], (err, result) => {
      if (err) {
        console.error('failed to request password reset', err)
        return res.status(500).send({ error: 'Unxpected Error' })
      }
      if (result.rows.length > 0) {
        const user = changeCase.camelCase(result.rows[0])
        const today = new Date().toDateString()
        sendMail(user, resetPasswordRequest, {
          token: hash({ ...user, passwordResetTokenIssued: today })
        })
      }
      res.sendStatus(200)
    })
  })
}
