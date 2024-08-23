const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Product = require('./productModel');
const Order = require('./orderModel');

const ProductOrder = sequelize.define('ProductOrder', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    OrderId: {
        type: DataTypes.INTEGER,
        references: {
            model: Order,
            key: 'id',
        },
    },
    ProductId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id',
        },
    }
});

// Define associations
Order.belongsToMany(Product, { through: ProductOrder });
Product.belongsToMany(Order, { through: ProductOrder });

module.exports = ProductOrder;