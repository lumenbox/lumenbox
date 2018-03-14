const wrap = require('./wrap')

module.exports = user => ({
  subject: 'Welcome to Lumenbox',
  text: wrap(user, 'Welcome to Lumenbox, the first DKIF secured federation service for Stellar.')
})
