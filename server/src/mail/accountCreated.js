const wrap = require('./wrap')

module.exports = (user, { domain, name, account }) => ({
  subject: 'Lumenbox Account Created',
  text: wrap(
    user,
    `A new Lumenbox stellar federation account has been created.

        ${name}*${domain} -> ${account}
  
Please note that it normally takes a few minutes for the offline secure signing process to generate a signature for your record, but it can sometimes take longer. We will send you an email soon as the account is ready to use.`
  )
})
