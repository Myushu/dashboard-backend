const service = require('../../services/application/stats-service');
const logger = require('../../common/logger');

logger.info('loading controller : /stats')

module.exports = function(app) {
    // Get a client
    app.get('/stats/:idWebsite/:days', (req, res) => {
      service.get(req.params.idWebsite, req.params.days, req.user, res);
    });

    // generate stat
    app.put('/stats/:idWebsite', (req, res) => {
      service.generateData(req.params.idWebsite, req, res);
    });
}
