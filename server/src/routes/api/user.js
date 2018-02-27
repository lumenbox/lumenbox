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
        return res.sendStatus(201)
      })
    })(req, res, next)
  )
}
