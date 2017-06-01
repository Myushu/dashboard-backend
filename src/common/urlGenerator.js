const uuid = require('node-uuid');
const config = require('../common/configManager');
const orm = require('../common/orm');
const ms = require('../common/modelService')

exports.generateActivatation = (idClient, email) => {
  var content = {
    UUID: uuid.v4(),
    ID_CLIENT: idClient,
    EMAIL_ADDRESS: email
  };
  orm.delete(ms.CLIENT_URL_ACTIVATION.model, undefined, {where: {ID_CLIENT: idClient}}).then(function () {
    orm.create(ms.CLIENT_URL_ACTIVATION.model, undefined, content);
  });
  return config.get('URL', 'server.url') + ':' + config.get('PORT', 'server.port') + '/validation/' +  content.UUID;
}

exports.generateReset = (idClient, email) => {
  var content = {
    UUID: uuid.v4(),
    ID_CLIENT: idClient,
    EMAIL_ADDRESS: email
  };
  orm.delete(ms.CLIENT_URL_RESET.model, undefined, {where: {ID_CLIENT: idClient}}).then(function () {
    orm.create(ms.CLIENT_URL_RESET.model, undefined, content);
  });
  return config.get('URL', 'server.url') + ':' + config.get('PORT', 'server.port') + '/validation/reset/' +  content.UUID;
}
