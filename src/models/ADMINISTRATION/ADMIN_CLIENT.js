/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ADMIN_CLIENT', {
    ID_CLIENT: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    NAME: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LASTNAME: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EMAIL_ADDRESS: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DATE_BIRTHDAY: {
      type: DataTypes.DATE,
      allowNull: false
    },
    HASH_PASSWORD: {
      type: "VARBINARY(255)",
      allowNull: false
    }
  }, {
    tableName: 'ADMIN_CLIENT',
    timestamps: false
  });
};
