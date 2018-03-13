const wrap = require('./wrap')

module.exports = user => ({
  subject: 'LumenBox Password Changed',
  text: wrap(user, `Your password has been changed.`)
})
