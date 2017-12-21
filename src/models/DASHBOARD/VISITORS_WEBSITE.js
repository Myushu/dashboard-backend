/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VISITORS_WEBSITE', {
    ID_WEBSITE: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    DATE_EVENT: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    NB_VISITOR: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    NB_MINER: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    AVERAGE_TIME: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'VISITORS_WEBSITE',
    timestamps: false
  });
};
