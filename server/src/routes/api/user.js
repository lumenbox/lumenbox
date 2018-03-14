const RateLimit = require('express-rate-limit')
const sendMail = require('../../sendMail')
const welcome = require('../../mail/welcome')
const config = require('../../config')

const rateLimit = new RateLimit(config.rateLimit.newUser)

module.exports = ({ app, passport }) => {
  app.post('/api/user', rateLimit, (req, res, next) =>
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(401).send(info)
      }
      req.login(user, err => {
        if (err) {
          return next(err)
        }
        sendMail(user, welcome)
        return res.sendStatus(201)
      })
    })(req, res, next)
  )
}
