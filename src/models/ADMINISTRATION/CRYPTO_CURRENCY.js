/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CRYPTO_CURRENCY', {
    ID_CRYPTO: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      primaryKey: true
    },
    NAME: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'CRYPTO_CURRENCY',
    timestamps: false
  });
};
