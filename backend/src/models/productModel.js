const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const SubGroup = require('./subGroupModel');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    subGroupId: {
        type: DataTypes.INTEGER,
        references: {
            model: SubGroup,
            key: 'id',
        },
    }
});

Product.belongsTo(SubGroup, { foreignKey: 'subGroupId', as: 'subGroup' });

module.exports = Product;