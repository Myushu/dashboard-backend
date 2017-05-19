/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CRYPTO', {
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
    tableName: 'CRYPTO',
    timestamps: false
  });
};
