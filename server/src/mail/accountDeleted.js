const wrap = require('./wrap')

module.exports = (user, { domain, name, account }) => ({
  subject: 'LumenBox Account Deleted',
  text: wrap(
    user,
    `The LumenBox stellar federation account below has been delete.

  ${name}*${domain} -> ${account}
  
If this has been done in error, the account can be recreated at https://lumenbox.org.`
  )
})
