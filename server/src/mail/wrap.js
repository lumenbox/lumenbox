const config = require('../config')

module.exports = (user, message) => `Hi ${user.firstName},

${message}

Best Regards,

LumenBox Team
--
${config.supportEmailAddress}
https://lumenbox.org`
