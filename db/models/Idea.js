const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define("Idea", {
    ideaName: { type: DataTypes.STRING, allowNull: false },
    ideaDescription: { type: DataTypes.STRING, allowNull: false },
    ideaPicture: { type: DataTypes.STRING },
    ideaPdf: { type: DataTypes.STRING },
    fundType: { type: DataTypes.STRING },
    fundAmount: { type: DataTypes.INTEGER },
    recievedFund:{type: DataTypes.INTEGER ,
      defaultValue:0},
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
  SequelizeSlugify.slugifyModel(Idea, { source: ["ideaName"] });

  Idea.associate = (models) => {
    models.User.hasMany(Idea, {
      foreignKey: "ownerId",
      // as: "ideas",
    });
    Idea.belongsTo(models.User, {
      foreignKey: "ownerId",
    });
  }



  return Idea;
};
