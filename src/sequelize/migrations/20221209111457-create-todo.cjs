'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      text: {
        type: Sequelize.STRING
      }

    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('todos')
  }
}
