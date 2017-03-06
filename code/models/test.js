const Sequelize = require('sequelize');

module.exports = {
  name: 'posts',
  attributes: {
    title: {
      type: Sequelize.STRING(120),
      allowNull: false
    },
    summary: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    userId: {
      type: Sequelize.INTEGER(5),
      allowNull: false,
      defaultValue: 0,
      field: 'user_id'
    }
  },
  options: {
    indexes: []
  }
};

