const jwt = require('jsonwebtoken');
const config = require('../../common/configManager');
const orm = require('../../common/orm');
const alias = require('../../common/alias');
const errorManager = require('../../common/errors');
const queryManager = require('../../common/queryManager');
const mailManager = require('../../common/mailManager');

exports.getById = (idWebsite, clientToken, res) => {
  var attributes = {
    attributes: alias.websiteAttributes,
    include : alias.clientWebsiteInclude(clientToken.ID_CLIENT, idWebsite),
    where : {
      IS_ENABLE : true,
    }
  }
  return orm.find(alias.websiteModel, res, attributes);
}

exports.getAll = (clientToken, res) => {
  var attributes = {
    attributes: alias.websiteAttributes,
    include : alias.clientWebsiteIncludeByClient(clientToken.ID_CLIENT),
    where : {
      IS_ENABLE : true,
    }
  }
  return orm.findAll(alias.websiteModel, res, attributes);
}

exports.create = (req, res, clientToken) => {
  delete req.ID_WEBSITE;
  delete req.DATE_CREATION;
  delete req.DATE_UPDATE;
  delete req.DATE_ACTIVE_UPDATE;
  req.IS_ACTIVE = false;
  req.IS_ENABLE = true;
  orm.transaction(alias.websiteModel, res, function(t) {
    return orm.create(alias.websiteModel, res, req, t).then(function (website) {
      var content = {
        ID_CLIENT : clientToken.ID_CLIENT,
        ID_WEBSITE : website.ID_WEBSITE
      };
      return orm.create(alias.clientWebsiteModel, res, content, t);
    });
  });
}

// must check is enable;
exports.update = (content, idWebsite, clientToken, res) => {
  delete content.ID_WEBSITE;
  delete content.DATE_CREATION;
  delete content.DATE_ACTIVE_UPDATE;
  delete content.IS_ACTIVE;
  delete content.IS_ENABLE;
  content.DATE_UPDATE = new Date();
  orm.transaction(alias.clientWebsiteModel, res, function(t) {
    return orm.find(alias.clientWebsiteModel, res, {
      where : alias.clientWebsitWhereIsClient(clientToken.ID_CLIENT, idWebsite)}, t)
        .then(function (result) {
        return orm.update(alias.websiteModel, content, res, { where : {'ID_WEBSITE' : idWebsite}, transaction: t});
    });
  });
}

exports.delete = (idWebsite, clientToken, res) => {
  var content = {
    'IS_ENABLE': false,
    'URL': '',
  }
  orm.transaction(alias.clientWebsiteModel, res, function(t) {
    return orm.find(alias.clientWebsiteModel, res, {
      where : alias.clientWebsitWhereIsClient(clientToken.ID_CLIENT, idWebsite)}, t)
        .then(function (result) {
          return orm.update(alias.websiteModel, content, res, { where : {'ID_WEBSITE' : idWebsite}, transaction : t});
        }
    );
  });
}
