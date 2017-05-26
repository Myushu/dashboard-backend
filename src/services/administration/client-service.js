const jwt = require('jsonwebtoken');
const config = require('../../common/configManager');
const orm = require('../../common/orm');
const ms = require('../../common/modelService');
const errorManager = require('../../common/errors');
const validation = require('./validation-service');
const website = require('./website-service')

const that = this;

exports.getById = (clientToken, res) => {
  var attributes = {
    attributes : ms.ADMIN_CLIENT.attributes ,
    include : ms.ADDRESS.include,
    where : {
      ID_CLIENT : clientToken.ID_CLIENT
    }
  }
  orm.find(ms.ADMIN_CLIENT.model, res, attributes);
}

exports.create = (req, res) => {
  delete req.ID_CLIENT;
  req.IS_VERIFIED = false;
  req.IS_ENABLE = true;
  if (req.ADDRESS == undefined)
    req.sendStatus(401);
  orm.transaction(ms.ADMIN_CLIENT.model, res, function(t) {
    console.log('ALJOSHA', req);
    return orm.create(ms.ADMIN_CLIENT.model, res, req, t)
    .then(function (client) {
      req.ADDRESS.ID_CLIENT = client.ID_CLIENT;
      return orm.create(ms.ADDRESS.model, res, req.ADDRESS, t).then(function () {
        validation.generate(client.EMAIL_ADDRESS);
      })
    });
  });
}

exports.update = (content, clientToken, res) => {
  delete content.ID_CLIENT;
  delete content.IS_VERIFIED;
  delete content.IS_ENABLE;
  delete content.EMAIL_ADDRESS;
  orm.transaction(ms.ADMIN_CLIENT.model, res, function(t) {
    return orm.update(ms.ADMIN_CLIENT.model, content, res, { where : {'ID_CLIENT' : clientToken.ID_CLIENT}, transaction : t})
      .then(function () {
        return orm.update(ms.ADDRESS.model, content.ADDRESS, res, { where : {'ID_CLIENT' : clientToken.ID_CLIENT}, transaction : t});
      });
  });
}

exports.delete = (clientToken, res) => {
  orm.transaction(ms.ADMIN_CLIENT.model, res, function(t) {
    return orm.update(ms.ADMIN_CLIENT.model, {IS_ENABLE: false}, res, {where: {'ID_CLIENT': clientToken.ID_CLIENT}, transaction: t}).then(function () {
       return orm.delete(ms.ADDRESS.model, undefined, {where: {'ID_CLIENT': clientToken.ID_CLIENT}, transaction: t}).then(function () {
        return website.deleteAll(clientToken.ID_CLIENT, res, t).then(function () {
          return that.logout(res, false);
        });
       });
    })
  });
}

exports.logout = (res, send) => {
  res.clearCookie('token');
  if (send != false)
    res.status(200).send();
}

exports.restore = (req, res) => {
  return res.send(501);
}


exports.checkAuthentication = (body, res) => {
  if (body.EMAIL_ADDRESS === undefined)
    errorManager.handle({name : "emailMissing"}, res);
  else if (body.HASH_PASSWORD === undefined)
    errorManager.handle({name : "passwordMissing"}, res);
  else
    return orm.find(ms.ADMIN_CLIENT.model, undefined, {where : body}).then(function (result) {
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
    if (!result || result.IS_ENABLE == false || result.IS_VERIFIED == false)
      res.status(403).send();
    else {
      orm.update(ms.ADMIN_CLIENT.model, {DATE_CONNECTION: new Date()}, res, {where: {ID_CLIENT: result.ID_CLIENT}});
      tokenGenerator(result, res);
    }
  });
}