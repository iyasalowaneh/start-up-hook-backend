const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define("Idea", {
    ideaName: { type: DataTypes.STRING, allowNull: false },
    ideaDescription: { type: DataTypes.STRING, allowNull: false },
    ideaPicture: { type: DataTypes.STRING },
    ideaPdf: { type: DataTypes.STRING },
    fundType: { type: DataTypes.STRING },
    fundAmount: { type: DataTypes.INTEGER },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
  SequelizeSlugify.slugifyModel(Idea, { source: ["ideaName"] });

  return Idea;
};
