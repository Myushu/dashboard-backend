const service = require('../../services/administration/websites-service');
const logger = require('../../common/logger');

logger.debug('loading controller : WEBSITES')

module.exports = function(app) {
    // Get a website of a clients
    app.get('/clients/:idClient/websites/:idWebsite', (req, res) => {
      service.getById(req.params.idClient, req.params.idWebsite, req.user, res);
    });

    // Get all websites of a clients
    app.get('/clients/:idClient/websites', (req, res) => {
      // service.getById(req.params.id, req.user, res);
    });

    // Create a new website
    app.post('/clients/:idClient/websites', (req, res) => {
       service.create(req.body, res, req.user);
    });

    // Update a website
    app.put('/clients/:idClient/websites/:idWebsite', (req, res) => {
      // service.update(req.body, req.params.id, req.user, res);
    });

    // Delete a website
    app.delete('/clients/:idClient/websites/:idWebsite', (req, res) => {
      // service.delete(req.params.id, req.user, res);
    });
}
