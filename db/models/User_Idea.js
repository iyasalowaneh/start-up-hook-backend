module.exports = User_Idea = (sequelize, DataTypes) => {
  const User_Idea = sequelize.define("User_Idea", {
    investorId: {
      type: DataTypes.INTEGER,
    },
    ideaId: {
      type: DataTypes.INTEGER,
    },
    amount: { type: DataTypes.INTEGER },
    agreement: { type: DataTypes.STRING },
  });
  User_Idea.associate = (models) => {
    models.User.belongsToMany(models.Idea, {
      through: User_Idea,
      foreignKey: "investorId",
    });
    models.Idea.belongsToMany(models.User, {
      through: User_Idea,
      foreignKey: "ideaId",
    });
  };

  return User_Idea;
};
