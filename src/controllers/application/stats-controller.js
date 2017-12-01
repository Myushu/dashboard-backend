const service = require('../../services/application/stats-service');
const logger = require('../../common/logger');

logger.debug('loading controller : /stats')

module.exports = function(app) {
    // Get a client
    app.get('/stats/:idWebsite/:nbDay', (req, res) => {
      service.get(req.params.idWebsite, req.params.nbDay, req.user, res);
    });

    // generate stat
    app.put('/stats/:idWebsite', (req, res) => {
      service.generateData(req.params.idWebsite, req, res);
    });
}
