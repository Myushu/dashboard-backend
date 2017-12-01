/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ADDRESS', {
    ID_CLIENT: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ADMIN_CLIENT',
        key: 'ID_CLIENT'
      }
    },
    STREET: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CITY: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    STATE: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ZIP_CODE: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    COUNTRY: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'ADDRESS',
    timestamps: false
  });
};
