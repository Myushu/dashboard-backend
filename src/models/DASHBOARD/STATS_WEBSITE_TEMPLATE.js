/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('STATS_WEBSITE_TEMPLATE', {
    DATE_RANK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    NB_VISITE: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    AVERAGE_TIME: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'STATS_WEBSITE_TEMPLATE',
    timestamps: false
  });
};
