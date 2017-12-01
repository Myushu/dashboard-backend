/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('WEBSITE', {
    ID_WEBSITE: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    URL: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    DATE_CREATION: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    DATE_UPDATE: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DATE_ACTIVE_UPDATE: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DATE_CHECK: {
      type: DataTypes.DATE,
      allowNull: true
    },
    IS_ACTIVE: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1'
    },
    IS_ENABLE: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'WEBSITE',
    timestamps: false
  });
};
