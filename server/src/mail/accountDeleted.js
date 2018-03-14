const wrap = require('./wrap')

module.exports = (user, { domain, name, account }) => ({
  subject: 'Lumenbox Account Deleted',
  text: wrap(
    user,
    `The Lumenbox stellar federation account below has been deleted.

        ${name}*${domain} -> ${account}
  
If this has been done in error, the account can be recreated at https://lumenbox.org.`
  )
})
