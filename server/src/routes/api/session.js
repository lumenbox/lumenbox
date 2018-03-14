const pick = require('lodash/pick')
const RateLimit = require('express-rate-limit')

const rateLimit = new RateLimit({
  windowMs: 60 * 60 * 1000, // window
  delayAfter: 5, // begin slowing down responses after
  delayMs: 6 * 1000, // slow down subsequent responses
  max: 10, // start blocking after
  message: 'Too many login attempts from this IP, please try again later'
})

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
