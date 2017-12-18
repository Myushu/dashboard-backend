
const orm = require('../../common/orm');
const ms = require('../../common/modelService');
const bitGo = require('../../common/BitgoAPI');

const logger = require('../../common/logger');


exports.transfert = (body, user, res) => {
  bitgo.loginWithToken("v2xfa9b3ec7f9b2a8b957df748d63e2d3ea85674eba5237c11d3d1cdc929d3a6db2");
  bitgo.getWallet("").then(function(wallet) {
    bitgo.makeExchange(wallet, body.balance, body.addrDest);
  });
  return
}

exports.updateKeyAuth = (body, res) => {

  return
}
