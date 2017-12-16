/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('COUNTRY_RANKING', {
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
    COUNTRY: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    NB_VISITOR: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'COUNTRY_RANKING',
    timestamps: false
  });
};
