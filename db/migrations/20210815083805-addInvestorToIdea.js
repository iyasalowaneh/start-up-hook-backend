"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User_Ideas", {
      investorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },    
      ideaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("User_Ideas");
  },
};
