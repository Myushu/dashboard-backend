/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CLIENT_URL_RESET', {
    ID_CLIENT: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ADMIN_CLIENT',
        key: 'ID_CLIENT'
      }
    },
    UUID: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    EMAIL_ADDRESS: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'CLIENT_URL_RESET',
    timestamps: false
  });
};
