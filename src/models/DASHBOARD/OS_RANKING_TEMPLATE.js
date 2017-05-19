/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OS_RANKING_TEMPLATE', {
    DATE_RANK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    OS: {
      type: DataTypes.STRING,
      allowNull: false
    },
    RANK: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'OS_RANKING_TEMPLATE',
    timestamps: false
  });
};
