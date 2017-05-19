 const service = require('../../services/administration/clients-service');

module.exports = function(app) {
    // Get a client
    app.get('/clients/:id', (req, res) => {
      service.getById(req.params.id, req.user, res);
    });

    // Create a new client
    app.post('/clients/signup', (req, res) => {
       service.create(req.body, res);
    });

    // Update a client
    app.put('/clients/:id', (req, res) => {
      service.update(req.body, req.params.id, req.user, res);
    });

    // Delete a client
    app.delete('/clients/:id', (req, res) => {
      service.delete(req.params.id, req.user, res);
    });

    // Log in
    app.post('/clients/login', (req, res) => {
      service.authentification(req, res);
    });

    //Log out
    app.post('/clients/logout', (req, res) => {
      service.logout(req, res);
    });
}
