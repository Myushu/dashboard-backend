/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('COUNTRY_RANKING_TEMPLATE', {
    DATE_RANK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    COUNTRY: {
      type: DataTypes.STRING,
      allowNull: false
    },
    RANK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'COUNTRY_RANKING_TEMPLATE',
    timestamps: false
  });
};
