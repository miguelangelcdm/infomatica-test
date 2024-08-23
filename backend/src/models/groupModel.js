const Datatypes = require('sequelize')
const sequelize = require('../config/config')

const Group = sequelize.define('Group', {
    name: {
        type: Datatypes.STRING,
        allowNull: false
    },
})

module.exports = Group