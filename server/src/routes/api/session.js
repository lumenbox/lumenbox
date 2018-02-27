const pick = require('lodash/pick')
const changeCase = require('change-case-object')

const sendUser = (req, res) =>
  res.status(200).send({
    user: changeCase.camelCase(pick(req.user, ['first_name', 'last_name', 'email', 'limit']))
  })

module.exports = ({ app, pool, config, authorise, passport }) => {
  app
    .route('/api/session')
    .get(authorise, sendUser)
    .delete(authorise, (req, res) => {
      req.logout()
      res.sendStatus(200)
    })
    .post(passport.authenticate('local-login'), sendUser)
}
