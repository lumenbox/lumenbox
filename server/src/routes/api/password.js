const sendMail = require('../../sendMail')
const passwordChanged = require('../../mail/passwordChanged')
const { generateHash, verifyHash } = require('../../passport/local')

module.exports = ({ app, pool, config, authorise }) => {
  app.put('/api/password', authorise, (req, res) => {
    if (!verifyHash(req.body.password, req.user.passwordHash)) {
      return res.sendStatus(401)
    }
    pool.query(
      'update "user" set password_hash = $2, updated_at = now() where id = $1',
      [req.user.id, generateHash(req.body.newPassword)],
      (err, result) => {
        if (err) {
          console.error('failed to change password', err)
          return res.status(500).send({ error: 'Unxpected Error' })
        }
        sendMail(req.user, passwordChanged)
        res.sendStatus(200)
      }
    )
  })
}
