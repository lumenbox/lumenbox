const sendMail = require('../../sendMail')
const welcome = require('../../mail/welcome')

module.exports = ({ app, passport }) => {
  app.post('/api/user', (req, res, next) =>
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
