const jwt = require('jsonwebtoken');
const rg = require('rangen');
const config = require('../../common/configManager');
const orm = require('../../common/orm');
const ms = require('../../common/modelService');
const errorManager = require('../../common/errors');
const queryManager = require('../../common/queryManager');

function genRandom(low, high) {
  return Math.round(Math.random() * (high - low) + low);
}

function checkIsOwner(idClient, idWebsite, res, t) {
  return orm.find(ms.CLIENT_WEBSITE.model, res, {
      attributes : ms.CLIENT_WEBSITE.attributes,
      where : ms.CLIENT_WEBSITE.where.clientWebsite(idClient, idWebsite)
    }, t);
}

function deleteWebsite(idWebsite, res, t) {
  var defaultWebsite = {
    IS_ENABLE: false,
    ID_ACTIVE: false,
  };
  return orm.update(ms.WEBSITE.model, defaultWebsite, res, {where: {'ID_WEBSITE': idWebsite}, transaction : t}).then(function () {
    return orm.delete(ms.CRYPTO_CURRENCY_WEBSITE.model, res, {where: {'ID_WEBSITE': idWebsite}, transaction: t})
  })
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
  req.BITCOIN_AMOUNT = genRandom(1, 100);
  req.IS_ACTIVE = false;
  req.IS_ENABLE = true;
  req.ID_WEBSITE = rg.id(10);
  if (req.CRYPTO_CURRENCY_WEBSITEs == undefined || Array.isArray(req.CRYPTO_CURRENCY_WEBSITEs) != true)
    return errorManager.handle({name : "cryptoCurrencyMissing"}, res);
  orm.transaction(ms.WEBSITE.model, res, function(t) {
    return orm.createOrUpdate(ms.WEBSITE, res, req, {URL: req.URL, IS_ENABLE: false}, t).then(function (website) {
      var content = {
        ID_CLIENT : clientToken.ID_CLIENT,
        ID_WEBSITE : website.ID_WEBSITE
      };
      return orm.createOrUpdate(ms.CLIENT_WEBSITE, res, content, {ID_WEBSITE: content.ID_WEBSITE}, t).then(function () {
        return orm.query('ADMINISTRATION', 'call INIT_WEBSITE_CRYPTO(\'' + website.ID_WEBSITE + '\')', t).then(function () {
          return req.CRYPTO_CURRENCY_WEBSITEs.forEach(function (c) {
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
  delete content.BITCOIN_AMOUNT;
  content.DATE_UPDATE = new Date();
  orm.transaction(ms.CLIENT_WEBSITE.model, res, function(t) {
    return checkIsOwner(clientToken.ID_CLIENT, idWebsite, res, t)
      .then(function (result) {
        return orm.update(ms.WEBSITE.model, content, res, {where: {'ID_WEBSITE': idWebsite, 'IS_ENABLE': true}, transaction: t}).then(function () {
          var r;
          if (content.CRYPTO_CURRENCY_WEBSITEs != undefined) {
            content.CRYPTO_CURRENCY_WEBSITEs.forEach(function (c) {
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
      attributes : ms.CLIENT_WEBSITE.attributes,
      where : {
        ID_CLIENT: idClient
      },
      transaction : t
    }).then(function (result) {
      var r;
      result.forEach(function (idWebsite) {
        r = deleteWebsite(idWebsite.ID_WEBSITE, res, t)
      });
      return r;
    });
}
