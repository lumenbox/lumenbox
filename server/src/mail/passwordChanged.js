const wrap = require('./wrap')

module.exports = user => ({
  subject: 'Lumenbox Password Changed',
  text: wrap(user, `Your password has been changed.`)
})
