const orm = require('../common/orm');
const sequelize = require('sequelize');
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
exports.VISITORS_WEBSITE = {};
exports.MOST_VIEWED_PAGES = {}
exports.COUNTRY_RANKING = {};
exports.CRYPTO_MONEY = {}

exports.ADMIN_CLIENT.model = orm.getTable("ADMINISTRATION", "ADMIN_CLIENT");
exports.ADDRESS.model = orm.getTable("ADMINISTRATION", "ADDRESS");
exports.WEBSITE.model = orm.getTable("ADMINISTRATION", "WEBSITE");
exports.CLIENT_WEBSITE.model = orm.getTable("ADMINISTRATION", "CLIENT_WEBSITE");
exports.CRYPTO_CURRENCY.model = orm.getTable("ADMINISTRATION", "CRYPTO_CURRENCY");
exports.CLIENT_URL_RESET.model = orm.getTable("ADMINISTRATION", "CLIENT_URL_RESET");
exports.CLIENT_URL_ACTIVATION.model = orm.getTable("ADMINISTRATION", "CLIENT_URL_ACTIVATION");
exports.CRYPTO_CURRENCY_WEBSITE.model = orm.getTable("ADMINISTRATION", "CRYPTO_CURRENCY_WEBSITE");
exports.VISITORS_WEBSITE.model = orm.getTable("DASHBOARD", "VISITORS_WEBSITE");
exports.MOST_VIEWED_PAGES.model = orm.getTable("DASHBOARD", "MOST_VIEWED_PAGES");
exports.COUNTRY_RANKING.model = orm.getTable("DASHBOARD", "COUNTRY_RANKING");
exports.CRYPTO_MONEY.model = orm.getTable("DASHBOARD", "CRYPTO_MONEY");

this.ADDRESS.model.belongsTo(this.ADMIN_CLIENT.model, {foreignKey: 'ID_CLIENT'});

this.WEBSITE.model.hasMany(this.CRYPTO_CURRENCY_WEBSITE.model, {foreignKey: 'ID_WEBSITE'})
this.WEBSITE.model.hasMany(this.CLIENT_WEBSITE.model, {foreignKey: 'ID_WEBSITE'});
this.WEBSITE.model.hasMany(this.VISITORS_WEBSITE.model, {foreignKey: 'ID_WEBSITE'})
this.WEBSITE.model.hasMany(this.MOST_VIEWED_PAGES.model, {foreignKey: 'ID_WEBSITE'});
this.WEBSITE.model.hasMany(this.COUNTRY_RANKING.model, {foreignKey: 'ID_WEBSITE'})
this.WEBSITE.model.hasMany(this.CRYPTO_MONEY.model, {foreignKey: 'ID_WEBSITE'})

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

this.VISITORS_WEBSITE.model.belongsTo(this.WEBSITE.model, {foreignKey: 'ID_WEBSITE'});

this.MOST_VIEWED_PAGES.model.belongsTo(this.WEBSITE.model, {foreignKey: 'ID_WEBSITE'});

this.COUNTRY_RANKING.model.belongsTo(this.WEBSITE.model, {foreignKey: 'ID_WEBSITE'});

this.CRYPTO_MONEY.model.belongsTo(this.WEBSITE.model, {foreignKey: 'ID_WEBSITE'});

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
exports.WEBSITE.attributes = ['ID_WEBSITE', 'NAME', 'URL', 'IS_ACTIVE', 'BITCOIN_AMOUNT'];


// CLIENT_WEBSITE
exports.CLIENT_WEBSITE.attributesEmpty = [];
exports.CLIENT_WEBSITE.attributes = ['ID_WEBSITE', 'ID_CLIENT'];
exports.CLIENT_WEBSITE.where = {}
exports.CLIENT_WEBSITE.where.clientWebsite = (idClient, idWebsite) => {return {
  ID_CLIENT: idClient,
  ID_WEBSITE: idWebsite
}}
exports.CLIENT_WEBSITE.include = (idClient, idWebsite) => {return {
  model : this.CLIENT_WEBSITE.model,
  attributes : this.CLIENT_WEBSITE.attributesEmpty,
  where : this.CLIENT_WEBSITE.where.clientWebsite(idClient, idWebsite)
}}
exports.CLIENT_WEBSITE.include.client = (idClient) => {return {
  model : this.CLIENT_WEBSITE.model,
  attributes : this.CLIENT_WEBSITE.attributesEmpty,
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



// VISITORS_WEBSITE
exports.VISITORS_WEBSITE.attributes = [
  'ID_WEBSITE',
  [sequelize.fn('sum', sequelize.col('NB_MINER')), "NB_MINER_SUM"],
  [sequelize.fn('sum', sequelize.col('AVERAGE_TIME')), "AVERAGE_TIME_SUM"],
  [sequelize.fn('sum', sequelize.col('NB_VISITOR')), "NB_VISITOR_SUM"]
];
exports.VISITORS_WEBSITE.include = (idWebsite, oldDate) => {return {
  model: this.VISITORS_WEBSITE.model,
  attributes: this.VISITORS_WEBSITE.attributes,
  where: {
    DATE_EVENT: {
      $gt: oldDate
    }
  },
  group: 'ID_WEBSITE',
  limit: 1
}};

// MOST_VIEWED_PAGES
exports.MOST_VIEWED_PAGES.attributes = [
  'ID_WEBSITE',
  'URL',
  [sequelize.fn('sum', sequelize.col('NB_VISITOR')), "NB_VISITOR_SUM"]
];
exports.MOST_VIEWED_PAGES.include = (idWebsite, dateEvent) => {return {
  model: this.MOST_VIEWED_PAGES.model,
  attributes: this.MOST_VIEWED_PAGES.attributes,
  where: {
    DATE_EVENT: {
        $gt: dateEvent
    }
  },
  group: 'URL',
  order: 'NB_VISITOR_SUM DESC',
  limit: 10
}}

// COUNTRY_RANKING
exports.COUNTRY_RANKING.attributes = [
  'ID_WEBSITE',
  'COUNTRY',
  [sequelize.fn('sum', sequelize.col('NB_VISITOR')), "NB_VISITOR_SUM"]
];
exports.COUNTRY_RANKING.include = (idWebsite, dateEvent) => {return {
  model: this.COUNTRY_RANKING.model,
  attributes: this.COUNTRY_RANKING.attributes,
  where: {
    DATE_EVENT: {
        $gt: dateEvent
    }
  },
  group: 'COUNTRY',
  order: 'NB_VISITOR_SUM DESC',
  limit: 10
}}

// CRYPTO_MONEY
this.CRYPTO_MONEY.attributes = [
  'ID_WEBSITE',
  'CRYPTO',
  [sequelize.fn('sum', sequelize.col('AMOUNT')), "AMOUNT_SUM"]
];
exports.CRYPTO_MONEY.include = (idWebsite, dateEvent) => {return {
  model: this.CRYPTO_MONEY.model,
  attributes: this.CRYPTO_MONEY.attributes,
  where: {
    DATE_EVENT: {
        $gt: dateEvent
    }
  },
  group: 'CRYPTO',
  limit: 1
 }}

