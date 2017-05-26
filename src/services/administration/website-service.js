const jwt = require('jsonwebtoken');
const rg = require('rangen');
const config = require('../../common/configManager');
const orm = require('../../common/orm');
const ms = require('../../common/modelService');
const errorManager = require('../../common/errors');
const queryManager = require('../../common/queryManager');
const mailManager = require('../../common/mailManager');

function checkIsOwner(idClient, idWebsite, res, t) {
  return orm.find(ms.CLIENT_WEBSITE.model, res, {
      attributes : ms.CLIENT_WEBSITE.attributesFull,
      where : ms.CLIENT_WEBSITE.where.clientWebsite(idClient, idWebsite)
    }, t);
}

function deleteWebsite(idWebsite, res, t) {
  return orm.update(ms.WEBSITE.model, contentCleared, res, {where: {'ID_WEBSITE': idWebsite}, transaction : t});
}

exports.getById = (idWebsite, clientToken, res) => {
  var attributes = {
    attributes: ms.WEBSITE.attributes,
    include: [
      ms.CLIENT_WEBSITE.include(clientToken.ID_CLIENT, idWebsite),
      ms.CRYPTO_CURRENCY_WEBSITE.include(idWebsite)
    ],
    where : {
      IS_ENABLE : true,
    }
  }
  return orm.find(ms.WEBSITE.model, res, attributes);
}

exports.getAll = (clientToken, res) => {
  var attributes = {
    attributes: ms.WEBSITE.attributes,
    include : ms.CLIENT_WEBSITE.include.client(clientToken.ID_CLIENT),
    where : {
      IS_ENABLE : true,
    }
  }
  return orm.findAll(ms.WEBSITE.model, res, attributes);
}

exports.create = (req, res, clientToken) => {
  delete req.ID_WEBSITE;
  delete req.DATE_CREATION;
  delete req.DATE_UPDATE;
  delete req.DATE_ACTIVE_UPDATE;
  req.IS_ACTIVE = false;
  req.IS_ENABLE = true;
  req.ID_WEBSITE = rg.id(10);
  if (req.CRYPTO_CURRENCYs == undefined)
    return errorManager.handle({name : "cryptoCurrencyMissing"}, res);
  orm.transaction(ms.WEBSITE.model, res, function(t) {
    return orm.create(ms.WEBSITE.model, res, req, t).then(function (website) {
      var content = {
        ID_CLIENT : clientToken.ID_CLIENT,
        ID_WEBSITE : website.ID_WEBSITE
      };
      return orm.create(ms.CLIENT_WEBSITE.model, res, content, t).then(function () {
        return orm.query('ADMINISTRATION', 'call INIT_WEBSITE_CRYPTO(\'' + website.ID_WEBSITE + '\')', t).then(function () {
          return req.CRYPTO_CURRENCYs.forEach(function (c) {
            return orm.update(ms.CRYPTO_CURRENCY_WEBSITE.model, c, res, {where: {ID_WEBSITE: website.ID_WEBSITE}});
          });
        });
      });
    });
  });
}

exports.update = (content, idWebsite, clientToken, res) => {
  delete content.ID_WEBSITE;
  delete content.DATE_CREATION;
  delete content.DATE_ACTIVE_UPDATE;
  delete content.IS_ACTIVE;
  delete content.IS_ENABLE;
  content.DATE_UPDATE = new Date();
  orm.transaction(ms.CLIENT_WEBSITE.model, res, function(t) {
    return checkIsOwner(clientToken.ID_CLIENT, idWebsite, res, t)
      .then(function (result) {
        return orm.update(ms.WEBSITE.model, content, res, {where: {'ID_WEBSITE': idWebsite, 'IS_ENABLE': true}, transaction: t}).then(function () {
          var r;
          if (content.CRYPTO_CURRENCYs != undefined) {
            content.CRYPTO_CURRENCYs.forEach(function (c) {
              r = orm.update(ms.CRYPTO_CURRENCY_WEBSITE.model, c, res, {where: {'ID_WEBSITE': idWebsite}, transaction: t});
            });
            return r;
          }
      });
    });
  });
}

var contentCleared = {
  'IS_ENABLE': false,
  'URL': null,
  'NAME': null,
  'IS_ACTIVE': false,
}

exports.delete = (idWebsite, clientToken, res) => {
  orm.transaction(ms.CLIENT_WEBSITE.model, res, function(t) {
    return checkIsOwner(clientToken.ID_CLIENT, idWebsite, res, t)
      .then(function (result) {
        return deleteWebsite(idWebsite, res, t)
      }
    );
  });
}

// used by client-service
exports.deleteAll = (idClient, res, t) => {
  return orm.findAll(ms.CLIENT_WEBSITE.model, res, {
      attributes : ms.CLIENT_WEBSITE.attributesFull,
      where : {
        ID_CLIENT: idClient
      },
      transaction : t
    }).then(function (result) {
      var r;
      result.forEach(function (idWebsite) {
        r = deleteWebsite(idWebsite, res, t)
      });
      return r;
    });
}
