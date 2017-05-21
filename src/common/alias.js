const orm = require('../common/orm');

////////////////////////////////////////////////////////////////////////////////
// ADMINISTRATION
////////////////////////////////////////////////////////////////////////////////
const clientModel = orm.getTable("ADMINISTRATION", "ADMIN_CLIENT");
const addressModel = orm.getTable("ADMINISTRATION", "ADDRESS");

addressModel.belongsTo(clientModel, {foreignKey : 'ID_CLIENT'});
clientModel.hasOne(addressModel, {foreignKey : 'ID_CLIENT'})

// Client
exports.clientAttributes =  ['ID_CLIENT', 'NAME', 'LASTNAME', 'EMAIL_ADDRESS', 'DATE_BIRTHDAY'];

// Address
exports.addressAttributes = ['STREET', 'CITY', 'STATE', 'ZIP_CODE', "COUNTRY"];
exports.addressInclude = {
  model : addressModel,
  attributes : this.addressAttributes
}

// Website
exports.websiteAttributes = ['ID_WEBSITE', 'NAME', 'URL', 'IS_ACTIVE'];
