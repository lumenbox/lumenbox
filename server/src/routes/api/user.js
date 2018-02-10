export default ({ app }) => {
  app.post('/api/user', passport.authenticate('local-signup'))
}
