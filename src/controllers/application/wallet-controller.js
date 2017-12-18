const service = require('../../services/application/wallet-service');
const logger = require('../../common/logger');

logger.debug('loading controller : /wallet')

module.exports = function(app) {
    // Get a client
    app.post('/wallet/transfert', (req, res) => {
      service.transfert(req.body, req.user, res);
    });

    // the wallet authentification
    app.post('/website/keyAuth', (req, res) => {
      service.updateKeyAuth(req.body, res);
    });
}
