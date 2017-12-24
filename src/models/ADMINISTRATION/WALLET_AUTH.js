/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('WALLET_AUTH', {
    ID_WALLET: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    TOKEN: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ID_BITGO_WALLET: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'WALLET_AUTH',
    timestamps: false
  });
};
