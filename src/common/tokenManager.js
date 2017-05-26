const jwt = require('express-jwt');
const pathToRegexp = require('path-to-regexp');
const config = require('../common/configManager');

module.exports = function(app) {
  app.use(jwt({
    secret: config.get('JWT_SECRET', 'jwt.secret'),
    credentialsRequired: true,
    getToken: function fromHeaderOrQuerystring (req) {
      return req.cookies.token;
    }
  }).unless({path : ['/', '/client/login', '/client/signup', pathToRegexp('/validation/*'), '/validation', '/client/restore']}));

  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send();
    }
  });
}
