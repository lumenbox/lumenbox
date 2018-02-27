module.exports = ({ app, passport }) => {
  app.post('/api/user', passport.authenticate('local-signup'))
}
