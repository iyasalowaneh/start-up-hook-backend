"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Ideas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ideaName: { type: Sequelize.STRING, allowNull: false },
      ideaDescription: { type: Sequelize.STRING, allowNull: false },
      ideaPicture: { type: Sequelize.STRING },
      ideaPdf: { type: Sequelize.STRING },
      fundType: { type: Sequelize.STRING, allowNull: false },
      fundAmount: { type: Sequelize.INTEGER, defaultValue: 0 },

      slug: {
        type: Sequelize.STRING,
        unique: true,
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
    await queryInterface.dropTable("Ideas");
  },
};
