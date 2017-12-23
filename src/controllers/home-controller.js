const config = require('../common/configManager');
const logger = require('../common/logger');

logger.info('loading controller : /home')

module.exports = function(app) {
  // Get the default page
  app.get('/', (req, res) => {
    res.redirect(config.get('CLIENT_URL', 'client.url'));
  });
}
