const orm = require('../../common/orm');
const mailManager = require('../../common/mailManager');
const urlGenerator = require('../../common/urlGenerator');
const ms = require("../../common/modelService")

exports.validateActivation = (uuid, res) => {
  orm.find(ms.CLIENT_URL_ACTIVATION.model, undefined, {where: {'UUID': uuid}}).then(function (result) {
    if (result == null)
      return res.sendStatus(400);
    orm.find(ms.ADMIN_CLIENT.model, undefined, {where: {EMAIL_ADDRESS: result.EMAIL_ADDRESS, ID_CLIENT: result.ID_CLIENT}}).then(function (client) {
      if (client == null)
        return res.sendStatus(400);
      orm.update(ms.ADMIN_CLIENT.model, {'IS_VERIFIED': true}, res, {where: {'ID_CLIENT': result.ID_CLIENT}}).then(function () {
        orm.delete(ms.CLIENT_URL_ACTIVATION.model, undefined, {where: {'UUID': uuid}});
      });
    });
  });
}

exports.generateActivation = (emailAddress) => {
  return orm.find(ms.ADMIN_CLIENT.model, undefined, {where: {EMAIL_ADDRESS: emailAddress}}).then(function (result) {
    if (result) {
      mailManager.send(result.EMAIL_ADDRESS, "Activate your AntMine account", 
        "Hello " + result.NAME + ",\n" + "Your AntMine must be activated. Please click to the link: "
        + urlGenerator.generateActivatation(result.ID_CLIENT, result.EMAIL_ADDRESS)
        + "\n\n If you have any problem, contact us: contact@antmine.io\
        \n--\n The AntMine Team");
      return true;
    } else {
      return false;
    }
  });
}

exports.validateReset = (uuid, body, res) => {
  orm.find(ms.CLIENT_URL_RESET.model, undefined, {where: {'UUID': uuid}}).then(function (result) {
    if (result == null)
      return res.sendStatus(400);
    orm.find(ms.ADMIN_CLIENT.model, undefined, {where: {EMAIL_ADDRESS: result.EMAIL_ADDRESS, ID_CLIENT: result.ID_CLIENT}}).then(function (client) {
      if (client == null)
        return res.sendStatus(400);
      orm.update(ms.ADMIN_CLIENT.model, {'IS_ENABLE': true, 'HASH_PASSWORD': body.HASH_PASSWORD}, res, {where: {'ID_CLIENT': result.ID_CLIENT}}).then(function () {
        orm.delete(ms.CLIENT_URL_RESET.model, undefined, {where: {'UUID': uuid}});
      });
    });
  });
}


exports.generateReset = (emailAddress) => {
  return orm.find(ms.ADMIN_CLIENT.model, undefined, {where: {EMAIL_ADDRESS: emailAddress}}).then(function (result) {
    if (result) {
      orm.update(ms.ADMIN_CLIENT.model, {'IS_ENABLE': false}, undefined, {where: {'ID_CLIENT': result.ID_CLIENT}});
      mailManager.send(result.EMAIL_ADDRESS, "Reset your AntMine password",
         "Hello " + result.NAME + ",\n" + "You requested to reset your password.\n" +
         "Please click to the link: " + urlGenerator.generateReset(result.ID_CLIENT, result.EMAIL_ADDRESS)
        + "\n\n If you have any problem, contact us: contact@antmine.io\
        \n--\n The AntMine Team");
      return true;
    } else {
      return false;
    }
  });
}
