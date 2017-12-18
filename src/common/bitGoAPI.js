
const BitGoJS = require('bitgo');

function BitgoAPI() {
  var env = 'prod';
  var coinType = 'BTC';
  var walletPassphrase = '123456789TOTO';

  var bitgo;
  var user;
}

BitgoAPI.prototype.login = function(user, password, code, callBack) {
  var self = this;
  this.bitgo = new BitGoJS.BitGo({
    env: self.env,
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
  if (this.accessToken == undefined || this.accessToken == null) {
    console.error("BitgoAPI :: accessToken undefined");
    return null;
  }
  this.bitgo = new BitGoJS.BitGo({
    env: self.env,
    accessToken: accessToken
  });
  console.dir('login');
}

BitgoAPI.prototype.logout = function(callBack) {
  if (this.bitgo == undefined || this.bitgo == null) {
    console.error("BitgoAPI :: No Session open");
    return null;
  }

  var self = this;
  bitgo.logout({}).then(function () {
    this.bitgo = null;
    callBack();
  });
}

BitgoAPI.prototype.getWalletList = function() {
  if (this.bitgo == undefined || this.bitgo == null) {
    console.error("BitgoAPI :: No Session open");
    return null;
  }

  this.bitgo.coin(this.coinType).wallets().list({})
  .then(function(wallets) {
    return wallets;
  });
}

BitgoAPI.prototype.genWallet = function(label, passphrase) {
  if (this.bitgo == undefined || this.bitgo == null) {
    console.error("BitgoAPI :: No Session open");
    return null;
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
    return null;
  }

  this.bitgo.coin(this.coinType).wallets().get({
    id: idWallet
  }).then(function(wallet) {
    return wallet;
  });
}

BitgoAPI.prototype.makeExchange = function(wallet, balance, addrDest) {
  if (this.bitgo == undefined || this.bitgo == null) {
    console.error("BitgoAPI :: No Session open");
    return null;
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
