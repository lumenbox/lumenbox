const nodemailer = require('nodemailer')
const config = require('./config')

const transporter = nodemailer.createTransport(config.mail)
if (config.isProduction) {
  transporter.verify(function(error, success) {
    if (error) {
      return console.error('SMTP ERROR', error)
    }
    console.log('SMTP OK')
  })
}

module.exports = (user, template, options) => {
  const to = `"${user.firstName} ${user.lastName}" <${user.email}>`
  const { subject, text } = template(user, options)
  if (config.isProduction) {
    transporter.sendMail(
      {
        to,
        from: `"LumenBox" <${config.supportEmailAddress}>`,
        subject,
        text
      },
      (error, info) => {
        if (error) {
          return console.log('SMTP ERROR', error)
        }
        console.log('SMTP SENT', to, subject)
      }
    )
  } else {
    console.log('MAIL TO:', to)
    console.log('SUBJECT:', subject)
    console.log(text)
  }
}
