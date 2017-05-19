/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CRYPTO_USER', {
    ID_CRYPTO: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      primaryKey: true
    },
    ID_CLIENT: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'CRYPTO_USER',
    timestamps: false
  });
};
