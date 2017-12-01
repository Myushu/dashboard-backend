/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('COUNTRY_RANKING', {
    ID_WEBSITE: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'WEBSITE',
        key: 'ID_WEBSITE'
      }
    },
    COUNTRY: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    DATE: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    PRECENT: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'COUNTRY_RANKING',
    timestamps: false
  });
};
