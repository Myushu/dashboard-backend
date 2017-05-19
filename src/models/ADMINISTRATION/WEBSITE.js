/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('WEBSITE', {
    ID_WEBSITE: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    NAME: {
      type: DataTypes.STRING,
      allowNull: true
    },
    URL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IS_ACTIVE: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: "1"
    }
  }, {
    tableName: 'WEBSITE',
    timestamps: false
  });
};
