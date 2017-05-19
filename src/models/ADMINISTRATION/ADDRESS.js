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
      type: DataTypes.STRING,
      allowNull: false
    },
    CITY: {
      type: DataTypes.STRING,
      allowNull: false
    },
    STATE: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ZIP_CODE: {
      type: DataTypes.STRING,
      allowNull: false
    },
    COUNTRY: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'ADDRESS',
    timestamps: false
  });
};
