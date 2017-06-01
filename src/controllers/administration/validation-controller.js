const service = require('../../services/administration/validation-service');
const logger = require('../../common/logger');

logger.debug('loading controller : /validation')

module.exports = function(app) {
    // Validate a client email
    app.get('/validation/:uuid', (req, res) => {
      service.validateActivation(req.params.uuid,res);
    });

    app.get('/validation/reset/:uuid', (req, res) => {
      service.validateReset(req.params.uuid,res);
    });

    app.get('/validation?:email', (req, res) => {
      if (service.generateActivation(req.query.email))
        res.sendStatus(200);
      else
        res.sendStatus(401);
    })
}
