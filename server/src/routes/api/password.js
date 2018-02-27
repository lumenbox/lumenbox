const { generateHash, verifyHash } = require('../../passport/local')

module.exports = ({ app, pool, config, authorise }) => {
  app.put('/api/password', authorise, (req, res) => {
    if (!verifyHash(req.body.password, req.user.password_hash)) {
      return res.sendStatus(401)
    }
    pool.query(
      'update "user" set password_hash = $2 where id = $1',
      [req.user.id, generateHash(req.body.newPassword)],
      (err, result) => {
        if (err) {
          console.error('failed to change password', err)
          return res.status(500).send({ error: 'Unxpected Error' })
        }
        res.sendStatus(200)
      }
    )
  })
}
