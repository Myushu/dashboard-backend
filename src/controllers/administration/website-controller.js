const service = require('../../services/administration/website-service');
const logger = require('../../common/logger');

logger.debug('loading controller : /website')

module.exports = function(app) {
    // Get a website of a clients
    app.get('/website/:idWebsite', (req, res) => {
      service.getById(req.params.idWebsite, req.user, res);
    });

    // Get all websites of a clients
    app.get('/website', (req, res) => {
      service.getAll(req.user, res);
    });

    // Create a new website
    app.post('/website', (req, res) => {
       service.create(req.body, res, req.user);
    });

    // Update a website
    app.put('/website/:idWebsite', (req, res) => {
      service.update(req.body, req.params.idWebsite, req.user, res);
    });

    // Delete a website
    app.delete('/website/:idWebsite', (req, res) => {
      service.delete(req.params.idWebsite, req.user, res);
    });
}
