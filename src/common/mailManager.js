const nodemailer = require('nodemailer');
const config = require('../common/configManager');
const logger = require('../common/logger')

let transporter = nodemailer.createTransport({
    host : config.get('MAIL_HOST', 'mail.smtp.host'),
    port : config.get('MAIL_PORT', 'mail.smtp.port'),
    secure : config.get('MAIL_SECURE', 'mail.smtp.secure'),
    auth: {
        user: config.get('MAIL_ADDRESS', 'mail.address'),
        pass: config.get('MAIL_PASSWORD', 'mail.password'),
    }
});

exports.send = (email, subject, html) => {
  var mailOptions = {
    from: config.get('MAIL_ADDRESS', 'mail.address'),
    to: email,
    subject: subject,
    text: html
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error && info)
      logger.error("Failed to send mail to", info.envelope.to[0])
    else if (error)
      logger.error("Failed to send mail :", error);
  })
}
