const wrap = require('./wrap')

module.exports = (user, { domain, name, account, system }) => ({
  subject: 'Lumenbox Account Updated',
  text: wrap(
    user,
    `The Lumenbox stellar federation account below has been updated.

        ${name}*${domain} -> ${account}${
      system
        ? `
  
Please note that it normally takes a few minutes for the offline secure signing process to generate a signature for your record, but it can sometimes take longer. We will send you an email soon as the account is ready to use.`
        : ''
    }`
  )
})
