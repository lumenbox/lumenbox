const urlencode = require('urlencode')
const wrap = require('./wrap')

module.exports = (user, { token }) => ({
  subject: 'Lumenbox Password Reset',
  text: wrap(
    user,
    `A password reset has been requested. Please click on the password reset link below to reset your password:

        https://app.lumenbox.org/password-reset/${urlencode(user.email)}/${token}

This password reset link will expire after tomorrow and can only be used one time.`
  )
})
