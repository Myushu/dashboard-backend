const winston = require('winston');
const config = require('../common/configManager');

const logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      colorize: true,
    })
  ]
});

logger.level = config.get('LOGGER_LEVEL', 'winston.level', 'silly');
logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};
logger.format = function (tokens, req, res) {
  var user = 'not connected'
  if (req.user)
    user = req.user.userId
  return [
    '\nmethod:      ', tokens.method(req, res),
    '\nurl:         ', tokens.url(req, res),
    '\nstatusCode:  ', tokens.status(req, res),
    '\nuserId:      ', user,
    '\nreponse-time:', tokens['response-time'](req, res), 'ms'
  ].join(' ')
};

module.exports = logger;
