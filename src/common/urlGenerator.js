const uuid = require('node-uuid');
const config = require('../common/configManager');
const orm = require('../common/orm');

const urlModel = orm.getTable("ADMINISTRATION", "CLIENT_URL_ACTIVATION");

exports.generate = (idClient, email) => {
  var content = {
    UUID: uuid.v4(),
    ID_CLIENT: idClient,
    EMAIL_ADDRESS: email
  };
  orm.delete(urlModel, undefined, {where: {ID_CLIENT: idClient}}).then(function () {
    orm.create(urlModel, undefined, content);
  });
  return config.get('URL', 'server.url') + ':' + config.get('PORT', 'server.port') + '/validation/' +  content.UUID;
}
