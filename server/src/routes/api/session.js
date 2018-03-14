const pick = require('lodash/pick')
const RateLimit = require('express-rate-limit')
const config = require('../../config')

const rateLimit = new RateLimit(config.rateLimit.login)

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
    .post(rateLimit, passport.authenticate('local-login'), sendUser)
}
