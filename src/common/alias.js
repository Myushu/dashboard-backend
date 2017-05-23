const orm = require('../common/orm');

////////////////////////////////////////////////////////////////////////////////
// ADMINISTRATION
////////////////////////////////////////////////////////////////////////////////
exports.clientModel = orm.getTable("ADMINISTRATION", "ADMIN_CLIENT");
exports.addressModel = orm.getTable("ADMINISTRATION", "ADDRESS");
exports.websiteModel = orm.getTable("ADMINISTRATION", "WEBSITE");
exports.clientWebsiteModel = orm.getTable("ADMINISTRATION", "CLIENT_WEBSITE");

this.addressModel.belongsTo(this.clientModel, {foreignKey : 'ID_CLIENT'});
this.clientModel.hasOne(this.addressModel, {foreignKey : 'ID_CLIENT'})
this.clientModel.hasMany(this.clientWebsiteModel, {foreignKey: 'ID_CLIENT'});
this.websiteModel.hasMany(this.clientWebsiteModel, {foreignKey: 'ID_WEBSITE'});
this.clientWebsiteModel.belongsTo(this.clientModel, {foreignKey : 'ID_CLIENT'});
this.clientWebsiteModel.belongsTo(this.websiteModel, {foreignKey : 'ID_WEBSITE'});


// Client
exports.clientAttributes =  ['ID_CLIENT', 'NAME', 'LASTNAME', 'EMAIL_ADDRESS', 'DATE_BIRTHDAY'];
exports.clientInclude = {
  model: this.clientModel,
  attributes: ['ID_CLIENT'],
}
// Address
exports.addressAttributes = ['STREET', 'CITY', 'STATE', 'ZIP_CODE', "COUNTRY"];
exports.addressInclude = {
  model: this.addressModel,
  attributes: this.addressAttributes
}

// Website
exports.websiteAttributes = ['ID_WEBSITE', 'NAME', 'URL', 'IS_ACTIVE'];

// ClientWebsite
exports.clientWebsiteAttributes = [];
exports.clientWebsitWhereIsClient = (idClient, idWebsite) => {
  return {
    ID_CLIENT: idClient,
    ID_WEBSITE: idWebsite
  }
}
exports.clientWebsiteInclude = (idClient, idWebsite) => {
  return {
    model : this.clientWebsiteModel,
    attributes : this.clientWebsiteAttributes,
    where : this.clientWebsitWhereIsClient(idClient, idWebsite)
  }
}
exports.clientWebsiteIncludeByClient = (idClient) => {
  return {
    model : this.clientWebsiteModel,
    attributes : this.clientWebsiteAttributes,
    where : {
      ID_CLIENT: idClient
    }
  }
}
