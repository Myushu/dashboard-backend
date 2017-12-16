/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CRYPTO_MONEY', {
    ID_WEBSITE: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'VISITORS_WEBSITE',
        key: 'ID_WEBSITE'
      }
    },
    DATE_EVENT: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    CRYPTO: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    AMOUNT: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'CRYPTO_MONEY',
    timestamps: false
  });
};
