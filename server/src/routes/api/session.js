const pick = require('lodash/pick')

module.exports = ({ app, pool, config, authorise, passport }) => {
  app
    .route('/api/session')
    .get(authorise, (req, res) => res.status(200).send({ user: pick(req.user, ['id', 'email']) }))
    .delete(authorise, (req, res) => {
      req.logout()
      res.sendStatus(200)
    })
    .post(passport.authenticate('local-login'))
}
