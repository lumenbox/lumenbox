const config = require('../config')

module.exports = (user, message) => `Hi ${user.firstName},

${message}

Best Regards,

Lumenbox Team
--
${config.supportEmailAddress}
https://lumenbox.org`
