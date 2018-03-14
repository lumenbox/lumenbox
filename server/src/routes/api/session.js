const pick = require('lodash/pick')

const sendUser = (req, res) =>
  res.status(200).send({
    user: pick(req.user, ['firstName', 'lastName', 'email', 'limit'])
  })

module.exports = ({ app, pool, config, authorise, passport }) => {
  app
    .route('/api/session')
    .get(authorise, sendUser)
    .delete(authorise, (req, res) => {
      req.logout()
      res.sendStatus(200)
    })
    .post(passport.authenticate('local-login'), sendUser)
}
