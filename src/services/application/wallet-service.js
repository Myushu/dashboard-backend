
const orm = require('../../common/orm');
const ms = require('../../common/modelService');
const bitgo = require('../../common/bitGoAPI');

const logger = require('../../common/logger');


exports.transfert = (body, clientToken, res) => {

  orm.find(ms.WALLET_AUTH.model, res, {
    where : {
      ID_WALLET: 1
    }
  }).then(function(walletAuth) {
    //"v2xfa9b3ec7f9b2a8b957df748d63e2d3ea85674eba5237c11d3d1cdc929d3a6db2"
    console.log(walletAuth.TOKEN);

    bitgo.loginWithToken(walletAuth.TOKEN);
    bitgo.getWalletList().then(function(wallets) {
    //  for (var index in wallets.wallets) {
//    console.log(wallets);
      var wallet = wallets.wallets;
      console.log(wallet[2]);
      //}
    });
     bitgo.getWallet("5a2aaf339a42a23b073150a384ce055b").then(function(wallet) {
       bitgo.makeExchange(wallet, 6*1e8, "39ajYQvyKwB6ZV1qmC7ceaxVG59FWs7zP5");
    });


  })

  return
}

exports.updateKeyAuth = (body, res) => {
  orm.transaction(ms.WALLET_AUTH.model, res, function(t) {
    return orm.update(ms.WALLET_AUTH.model, body, res, {
      where: {
        'ID': 1
      },
      transaction: t
    });
  });

}
