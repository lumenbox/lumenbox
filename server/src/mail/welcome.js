const wrap = require('./wrap')

module.exports = user => ({
  subject: 'Welcome to Lumenbox',
  text: wrap(
    user,
    `Welcome to Lumenbox, the first DKIF secured federation service for Stellar.

Please click on the activation link below to enable your login and begin creating secure Stellar federation records:

        https://app.lumenbox.org/activate/${user.activationKey}`
  )
})
