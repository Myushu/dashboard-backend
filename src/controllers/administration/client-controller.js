const service = require('../../services/administration/client-service');
const logger = require('../../common/logger');

logger.debug('loading controller : /client')

module.exports = function(app) {
    // Get a client
    app.get('/client', (req, res) => {
      service.getById(req.user, res);
    });

    // Create a new client
    app.post('/client/signup', (req, res) => {
       service.create(req.body, res);
    });

    // Update a client
    app.put('/client', (req, res) => {
      service.update(req.body, req.user, res);
    });

    // Delete a client
    app.delete('/client', (req, res) => {
      service.delete(req.user, res);
    });

    // Log in
    app.post('/client/login', (req, res) => {
      service.authentification(req, res);
    });

    //Log out
    app.post('/client/logout', (req, res) => {
      service.logout(res);
    });

    //Restore account
    app.post('/client/restore', (req, res) => {
      service.restore(req, res);
    });
}
