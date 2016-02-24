var Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(16),
            allowNull: false,
            defaultValue: '',
            comment: "name"
        },
        value: {
            type: Sequelize.STRING(100),
            allowNull: false,
            defaultValue: '',
            comment: "value"
        }
    },
    options: {
        indexes: [
            {fields: ['name']},
        ]
    }
}