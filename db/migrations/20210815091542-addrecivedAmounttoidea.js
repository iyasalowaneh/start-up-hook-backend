"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
  

 
    await queryInterface.addColumn("Ideas", "recievedFund", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue:0
    });
  },


 
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Ideas", "recievedFund");
  },
};
