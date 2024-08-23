const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Group = require('./groupModel');

const SubGroup = sequelize.define('SubGroup', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  groupId: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'id'
    }
  }
});

SubGroup.belongsTo(Group, { foreignKey: 'groupId' });
Group.hasMany(SubGroup, { foreignKey: 'groupId' });

module.exports = SubGroup;