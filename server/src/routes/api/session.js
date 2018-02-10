const pick = require('lodash/pick')

export default ({ app, pool, config, authorise }) => {
  app
    .route('/api/session')
    .get(authorise, (req, res) => res.status(200).send({ user: pick(req.user, ['id', 'email']) }))
    .delete(authorise, (req, res) => {
      req.logout()
      res.sendStatus(200)
    })
    .post(passport.authenticate('local-login'))
}
