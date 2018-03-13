const wrap = require('./wrap')

module.exports = user => ({
  subject: 'Welcome to LumenBox',
  text: wrap(user, 'Welcome to LumenBox, the first DKIF secured federation service for Stellar.')
})
