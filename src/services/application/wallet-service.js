
const orm = require('../../common/orm');
//const ormClient = require('../../common/orm');
const ms = require('../../common/modelService');
const bitgo = require('../../common/bitGoAPI');
const errorManager = require('../../common/errors');
const logger = require('../../common/logger');

function getSolde(body, clientWebsites) {
  var solde = 0;
  for (var index in clientWebsites) {
    var website = clientWebsites[index];
    solde += website.BITCOIN_AMOUNT;
  }
  console.log(solde);
  return solde;
}

function getUserWebSite(clientToken) {
  var attributes = {
    attributes: ms.WEBSITE.attributes,
    include : ms.CLIENT_WEBSITE.include.client(clientToken.ID_CLIENT),
    where : {
      IS_ENABLE : true,
    }
  }
  return orm.findAll(ms.WEBSITE.model, undefined, attributes).then(function(clientWebsites){
    return clientWebsites;
  });
}

function makeTransaction(body, clientToken, res) {
  return orm.find(ms.WALLET_AUTH.model, undefined, {where : {ID_WALLET : 1} }).then(function(walletAuth) {
    console.log(walletAuth.TOKEN);
    bitgo.loginWithToken(walletAuth.TOKEN);
    return setTimeout(function() {
      return errorManager.handle({name: "bitgoNotFound"}, res);
    }, 1500);
    return bitgo.getWallet("5a2aaf339a42a23b073150a384ce055b").then(function(wallet) {
      return bitgo.makeExchange(wallet, body.BALANCE * 1e8, body.ADDR).then(function(t){
        res.end('{"status":"success"}');
      });
    });
  });

}

exports.transfert = (body, clientToken, res) => {
  if (body.ADDR === undefined)
    return errorManager.handle({name: "addrMissing"}, res);
  else if (body.BALANCE === undefined)
    return errorManager.handle({name: "balanceMissing"}, res);
    getUserWebSite(clientToken).then(function (clientWebsites){
      if (body.BALANCE > getSolde(clientWebsites)) {
        return errorManager.handle({name: "antmineNotFound"}, res);
      }
      makeTransaction(body, clientToken, res);
    });
}

exports.updateKeyAuth = (body, res) => {
    if (body.TOKEN === undefined)
      return errorManager.handle({name: "tokenMissing"}, res);
  orm.transaction(ms.WEBSITE.model, res, function(t) {
    return orm.update(ms.WALLET_AUTH.model, body, res, {
      where: {
        'ID_WALLET': 1
      },
      transaction: t
    });
  });
  }
