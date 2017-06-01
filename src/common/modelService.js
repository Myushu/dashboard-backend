const orm = require('../common/orm');

////////////////////////////////////////////////////////////////////////////////
// ADMINISTRATION
////////////////////////////////////////////////////////////////////////////////
exports.ADMIN_CLIENT = {};
exports.ADDRESS = {};
exports.WEBSITE = {};
exports.CLIENT_WEBSITE = {};
exports.CRYPTO_CURRENCY = {};
exports.CRYPTO_CURRENCY_WEBSITE = {};
exports.CLIENT_URL_ACTIVATION = {};
exports.CLIENT_URL_RESET = {};

exports.ADMIN_CLIENT.model = orm.getTable("ADMINISTRATION", "ADMIN_CLIENT");
exports.ADDRESS.model = orm.getTable("ADMINISTRATION", "ADDRESS");
exports.WEBSITE.model = orm.getTable("ADMINISTRATION", "WEBSITE");
exports.CLIENT_WEBSITE.model = orm.getTable("ADMINISTRATION", "CLIENT_WEBSITE");
exports.CRYPTO_CURRENCY.model = orm.getTable("ADMINISTRATION", "CRYPTO_CURRENCY");
exports.CLIENT_URL_RESET.model = orm.getTable("ADMINISTRATION", "CLIENT_URL_RESET");
exports.CLIENT_URL_ACTIVATION.model = orm.getTable("ADMINISTRATION", "CLIENT_URL_ACTIVATION");
exports.CRYPTO_CURRENCY_WEBSITE.model= orm.getTable("ADMINISTRATION", "CRYPTO_CURRENCY_WEBSITE");

this.ADDRESS.model.belongsTo(this.ADMIN_CLIENT.model, {foreignKey: 'ID_CLIENT'});
this.WEBSITE.model.hasMany(this.CRYPTO_CURRENCY_WEBSITE.model, {foreignKey: 'ID_WEBSITE'})
this.WEBSITE.model.hasMany(this.CLIENT_WEBSITE.model, {foreignKey: 'ID_WEBSITE'});
this.ADMIN_CLIENT.model.hasOne(this.ADDRESS.model, {foreignKey: 'ID_CLIENT'})
this.ADMIN_CLIENT.model.hasMany(this.CLIENT_WEBSITE.model, {foreignKey: 'ID_CLIENT'});
this.ADMIN_CLIENT.model.hasOne(this.CLIENT_URL_ACTIVATION.model, {foreignKey: 'ID_CLIENT'});
this.ADMIN_CLIENT.model.hasOne(this.CLIENT_URL_RESET.model, {foreignKey: 'ID_CLIENT'});
this.CLIENT_WEBSITE.model.belongsTo(this.ADMIN_CLIENT.model, {foreignKeu: 'ID_CLIENT'});
this.CLIENT_WEBSITE.model.belongsTo(this.WEBSITE.model, {foreignKey: 'ID_WEBSITE'});
this.CRYPTO_CURRENCY.model.hasMany(this.CRYPTO_CURRENCY_WEBSITE.model, {foreignKey: 'ID_CRYPTO'});
this.CLIENT_URL_ACTIVATION.model.belongsTo(this.ADMIN_CLIENT.model, {foreignKey: 'ID_CLIENT'});
this.CLIENT_URL_RESET.model.belongsTo(this.ADMIN_CLIENT.model, {foreignKey: 'ID_CLIENT'});
this.CRYPTO_CURRENCY_WEBSITE.model.belongsTo(this.WEBSITE.model, {foreignKey: 'ID_WEBSITE'});
this.CRYPTO_CURRENCY_WEBSITE.model.belongsTo(this.CRYPTO_CURRENCY.model, {foreignKey: 'ID_CRYPTO'});

// ADMIN_CLIENT
exports.ADMIN_CLIENT.attributes =  ['ID_CLIENT', 'NAME', 'LASTNAME', 'EMAIL_ADDRESS', 'DATE_BIRTHDAY', 'IS_VERIFIED'];
exports.ADMIN_CLIENT.include = {
  model: this.ADMIN_CLIENT.model,
  attributes: ['ID_CLIENT'],
}

// ADDRESS
exports.ADDRESS.attributes = ['STREET', 'CITY', 'STATE', 'ZIP_CODE', "COUNTRY"];
exports.ADDRESS.include = {
  model: this.ADDRESS.model,
  attributes: this.ADDRESS.attributes
}

// WEBSITE
exports.WEBSITE.attributes = ['ID_WEBSITE', 'NAME', 'URL', 'IS_ACTIVE'];

// CLIENT_WEBSITE
exports.CLIENT_WEBSITE.attributes = [];
exports.CLIENT_WEBSITE.attributesFull = ['ID_WEBSITE', 'ID_CLIENT'];
exports.CLIENT_WEBSITE.where = {}
exports.CLIENT_WEBSITE.where.clientWebsite = (idClient, idWebsite) => {return {
  ID_CLIENT: idClient,
  ID_WEBSITE: idWebsite
}}
exports.CLIENT_WEBSITE.include = (idClient, idWebsite) => {return {
  model : this.CLIENT_WEBSITE.model,
  attributes : this.CLIENT_WEBSITE.attributes,
  where : this.CLIENT_WEBSITE.where.clientWebsite(idClient, idWebsite)
}}
exports.CLIENT_WEBSITE.include.client = (idClient) => {return {
  model : this.CLIENT_WEBSITE.model,
  attributes : this.CLIENT_WEBSITE.attributes,
  where : {
    ID_CLIENT: idClient
  }
}}

// CRYPTO_CURRENCY_WEBSITE
exports.CRYPTO_CURRENCY_WEBSITE.attributes = ['ID_CRYPTO', 'IS_ENABLE'];
exports.CRYPTO_CURRENCY_WEBSITE.include = (idWebsite) => {return {
  model: this.CRYPTO_CURRENCY_WEBSITE.model,
  attributes: this.CRYPTO_CURRENCY_WEBSITE.attributes,
  where: {
    ID_WEBSITE: idWebsite
  }
}}
