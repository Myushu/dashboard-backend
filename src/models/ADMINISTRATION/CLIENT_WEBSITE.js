/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CLIENT_WEBSITE', {
    ID_WEBSITE: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'WEBSITE',
        key: 'ID_WEBSITE'
      }
    },
    ID_CLIENT: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'ADMIN_CLIENT',
        key: 'ID_CLIENT'
      }
    }
  }, {
    tableName: 'CLIENT_WEBSITE',
    timestamps: false
  });
};
