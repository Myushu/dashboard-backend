const service = require('../services/code-service');
const logger = require('../common/logger');

logger.info('loading controller : /code')

module.exports = function(app) {
  // Get the default page
  app.get('/code', (req, res) => {
    return service.get(res);
  });
}
