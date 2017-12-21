
const BitGoJS = require('bitgo');

function BitgoAPI() {
  this.env = 'prod';
  this.coinType = 'btc';
  this.walletPassphrase = '123456789TOTO';

  this.bitgo;
  this.user;
}

BitgoAPI.prototype.login = function(user, password, code, callBack) {
  var self = this;
  this.bitgo = new BitGoJS.BitGo({
    env: 'prod',
  });
  this.bitgo.authenticate({
    username: user,
    password: password,
    otp: code
  }).then(function(response) {
    this.user = response.user;
    return response;
  });
}

BitgoAPI.prototype.loginWithToken = function(accessToken) {
  if (accessToken == undefined || accessToken == null) {
    console.error("BitgoAPI :: accessToken undefined");
    return "error";
  }
  this.bitgo = new BitGoJS.BitGo({
    env: 'prod',
    accessToken: accessToken
  });
  console.dir('login');
}

BitgoAPI.prototype.logout = function(callBack) {
  if (this.bitgo == undefined || this.bitgo == null) {
    console.error("BitgoAPI :: No Session open");
    return "error";
  }

  var self = this;
  bitgo.logout({}).then(function () {
    this.bitgo = "error";
    callBack();
  });
}

BitgoAPI.prototype.getWalletList = function() {
  if (this.bitgo == undefined || this.bitgo == null) {
    console.error("BitgoAPI :: No Session open");
    return "error";
  }

  return this.bitgo.coin(this.coinType).wallets().list({})
  .then(function(wallets) {
    return wallets;
  });
}

BitgoAPI.prototype.genWallet = function(label, passphrase) {
  if (this.bitgo == undefined || this.bitgo == null) {
    console.error("BitgoAPI :: No Session open");
    return "error";
  }

  this.bitgo.coin(coinType).wallets().generateWallet({
     label: label,
     passphrase: passphrase
   }).then(function(wallet) {
     return wallet;
   });
}

BitgoAPI.prototype.getWallet = function(idWallet) {
  if (this.bitgo == undefined || this.bitgo == null) {
    console.error("BitgoAPI :: No Session open");
    return "error";
  }

  return this.bitgo.coin(this.coinType).wallets().get({
    id: idWallet
  }).then(function(wallet) {
    return wallet;
  });
}

BitgoAPI.prototype.makeExchange = function(wallet, balance, addrDest) {
  if (this.bitgo == undefined || this.bitgo == null) {
    console.error("BitgoAPI :: No Session open");
    return "error";
  }

  let params = {
      amount: balance,
      address: addrDest,
      walletPassphrase: this.walletPassphrase
    };
    try {
      wallet.send(params)
      .then(function(transaction) {
        console.log(transaction);
      });
    } catch (e) {
      console.log(e);
    }
}

module.exports = new BitgoAPI();
