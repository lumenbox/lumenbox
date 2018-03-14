const RateLimit = require('express-rate-limit')
const sendMail = require('../../sendMail')
const welcome = require('../../mail/welcome')

const rateLimit = new RateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  delayAfter: 1, // begin slowing down responses after the first request
  delayMs: 3 * 1000, // slow down subsequent responses by 3 seconds per request
  max: 5, // start blocking after 5 requests
  message: 'Too many accounts created from this IP, please try again later'
})

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
        sendMail(req.body, welcome)
        return res.sendStatus(201)
      })
    })(req, res, next)
  )
}
