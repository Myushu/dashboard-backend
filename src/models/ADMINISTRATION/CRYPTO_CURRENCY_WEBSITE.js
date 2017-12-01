/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CRYPTO_CURRENCY_WEBSITE', {
    ID_CRYPTO: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'CRYPTO_CURRENCY',
        key: 'ID_CRYPTO'
      }
    },
    ID_WEBSITE: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'WEBSITE',
        key: 'ID_WEBSITE'
      }
    },
    IS_ENABLE: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'CRYPTO_CURRENCY_WEBSITE',
    timestamps: false
  });
};
