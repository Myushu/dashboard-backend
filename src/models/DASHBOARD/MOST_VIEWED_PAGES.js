/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MOST_VIEWED_PAGES', {
    ID_WEBSITE: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'WEBSITE',
        key: 'ID_WEBSITE'
      }
    },
    DATE: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    URL: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    NB_VISITOR: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'MOST_VIEWED_PAGES',
    timestamps: false
  });
};
