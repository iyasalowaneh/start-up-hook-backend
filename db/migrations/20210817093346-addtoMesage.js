"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Messages", "name", Sequelize.STRING, {
      allowNull: false,
    });
    await queryInterface.addColumn("Messages", "slug", Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Messages", "name");
    await queryInterface.removeColumn("Messages", "slug");
  },
};