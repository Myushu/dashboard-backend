const orm = require('../../common/orm');
const mailManager = require('../../common/mailManager');
const urlGenerator = require('../../common/urlGenerator');

const clientModel = orm.getTable("ADMINISTRATION", "ADMIN_CLIENT");
const urlModel = orm.getTable("ADMINISTRATION", "CLIENT_URL_ACTIVATION");

exports.validate = (uuid, res) => {
  orm.find(urlModel, undefined, {where: {'UUID': uuid}}).then(function (result) {
    if (result == null)
      res.sendStatus(400);
    else {
      orm.update(clientModel, {'IS_VERIFIED': true}, res, {where: {'ID_CLIENT': result.ID_CLIENT}}).then(function () {
        orm.delete(urlModel, undefined, {where: {'UUID': uuid}});
      })
    }
  })
}

exports.generate = (emailAddress) => {
  return orm.find(clientModel, undefined, {where: {EMAIL_ADDRESS: emailAddress}}).then(function (result) {
    if (result) {
      mailManager.send(result.EMAIL_ADDRESS, "Activate your AntMine account", urlGenerator.generate(result.ID_CLIENT));
      return true;
    } else {
      return false;
    }
  });
}
