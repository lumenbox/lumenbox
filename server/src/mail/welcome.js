const urlencode = require('urlencode')
const wrap = require('./wrap')

module.exports = user => ({
  subject: 'Welcome to Lumenbox',
  text: wrap(
    user,
    `Welcome to Lumenbox, the first DKIF secured federation service for Stellar.

To activate your account and begin creating secure Stellar federation records, please log in to your new account using the following link:

        https://app.lumenbox.org/activate/${urlencode(user.email)}/${user.activationKey}`
  )
})
