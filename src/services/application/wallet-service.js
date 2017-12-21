
const orm = require('../../common/orm');
const ms = require('../../common/modelService');
const bitgo = require('../../common/bitGoAPI');
const errorManager = require('../../common/errors');
const logger = require('../../common/logger');


exports.transfert = (body, clientToken, res) => {
  if (body.ADDR === undefined)
    return errorManager.handle({name: "addrMissing"}, res);
  else if (body.BALANCE === undefined)
    return errorManager.handle({name: "balanceMissing"}, res);

  return orm.find(ms.WALLET_AUTH.model, undefined, {where : {ID_WALLET : 1} }).then(function(walletAuth) {
    console.log(walletAuth.TOKEN);
  //  orm.find(ms.ADMIN_CLIENT.model, undefined, {where : {ID_CLIENT: clientToken}}).then(function(client) {
    //  console.log(client);
      bitgo.loginWithToken(walletAuth.TOKEN);
      return setTimeout(function() {
        return errorManager.handle({name: "bitgoNotFound"}, res);
      }, 1500);
       return bitgo.getWallet("5a2aaf339a42a23b073150a384ce055b").then(function(wallet) {
         return bitgo.makeExchange(wallet, body.BALANCE * 1e8, body.ADDR).then(function(t){
            res.end('{"status":"success"}');
         });
  //    });
    });
   });
}

exports.updateKeyAuth = (body, res) => {
    if (body.TOKEN === undefined)
      return errorManager.handle({name: "tokenMissing"}, res);
    return orm.update(ms.WALLET_AUTH.model, body, undefined, {
      where: {
        'ID_WALLET': 1
      },
      transaction: t
    });
  });

}
