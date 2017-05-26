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
    DATE_CONNECTION: {
      type: DataTypes.DATE,
      allowNull: true
    },
    HASH_PASSWORD: {
      type: "VARBINARY(255)",
      allowNull: false
    },
    IS_VERIFIED: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: "0"
    },
    IS_ENABLE: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: "1"
    }
  }, {
    tableName: 'ADMIN_CLIENT',
    timestamps: false
  });
};
