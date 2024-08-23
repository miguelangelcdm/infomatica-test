const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Order = sequelize.define('Order', {}, {
    timestamps: true
});

module.exports = Order;