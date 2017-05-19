const extend = require('util')._extend
const jwt = require('jsonwebtoken');
const config = require('../../common/configManager');
const orm = require('../../common/orm');
const alias = require('../../common/alias');
const errorManager = require('../../common/errors');
const queryManager = require('../../common/queryManager');

const clientModel = orm.getTable("ADMINISTRATION", "ADMIN_CLIENT");
const addressModel = orm.getTable("ADMINISTRATION", "ADDRESS");
// addressModel.belongsTo(clientModel, {foreignKey : 'ID_CLIENT'});
// clientModel.hasOne(addressModel, {foreignKey : 'ID_CLIENT'})

exports.getById = (idClient, clientToken, res) => {
  var attributes = {
    attributes : alias.clientAttributes,
    include : alias.addressInclude
  }
  if (idClient != clientToken.ID_CLIENT)
    res.sendStatus(401);
  orm.find(clientModel, res, attributes);
}

exports.create = (req, res) => {
  delete req.ID_CLIENT;
  if (req.ADDRESS == undefined)
    req.sendStatus(401);
  orm.transaction(clientModel, res, function(t) {
    return orm.create(clientModel, res, req, t)
    .then(function (client) {
      req.ADDRESS.ID_CLIENT = client.ID_CLIENT;
      return orm.create(addressModel, res, req.ADDRESS, t);
    });
  });
}

exports.update = (content, idClient, clientToken, res) => {
  delete content.ID_CLIENT;
  if (idClient != clientToken.ID_CLIENT)
    res.sendStatus(401);
  else {
    orm.transaction(clientModel, res, function(t) {
      return orm.update(clientModel, content, res, { where : {'ID_CLIENT' : clientToken.ID_CLIENT}, transaction : t})
      .then(function () {
        return orm.update(addressModel, content.ADDRESS, res, { where : {'ID_CLIENT' : clientToken.ID_CLIENT}, transaction : t});
      });
    });
  }
}

exports.delete = (idClient, clientToken, res) => {
  orm.delete(clientModel, res, { where : {'ID_CLIENT' : clientToken.ID_CLIENT }});
  this.logout(res);
}

exports.logout = (res) => {
  res.clearCookie('token');
  res.status(200).send();
}

exports.checkAuthentication = (body, res) => {
  if (body.EMAIL_ADDRESS === undefined)
    errorManager.handle({name : "emailMissing"}, res);
  else if (body.HASH_PASSWORD === undefined)
    errorManager.handle({name : "passwordMissing"}, res);
  else
    return orm.find(clientModel, undefined, {where : body}).then(function (result) {
      return result;
    })
}

function tokenGenerator(result, res) {
    var client = {ID_CLIENT : result.ID_CLIENT};
    var token = jwt.sign(client, config.get('JWT_SECRET', 'jwt.secret'), {
      expiresIn: config.get('TOKEN_EXPIRE', 'token.expire') * 1000,
    });
    res.cookie('token', token, {maxAge: config.get('TOKEN_EXPIRE', 'token.expire') * 1000, httpOnly: true});
    res.status(200).send(client);
}

exports.authentification = (req, res) => {
  this.checkAuthentication(req.body, res).then(function(result) {
    if (!result)
      res.status(403).send();
    else
      tokenGenerator(result, res);
  });
}
