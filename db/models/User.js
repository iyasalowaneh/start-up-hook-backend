const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    confirmPassword: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING },
    profilePicture: { type: DataTypes.STRING },
    idPicture: { type: DataTypes.STRING },
    education: { type: DataTypes.STRING },
    experiance: { type: DataTypes.TEXT },
    country: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
    wallet: { type: DataTypes.INTEGER, defaultValue: 0 },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
  SequelizeSlugify.slugifyModel(User, { source: ["firstName", "lastName"] });

  // User.associate = (models) => {
  // 	User.belongsToMany(models.Idea, {
  // 		through: models.User_Idea,
  // 		foreignKey: "investorId",
  // 		as: "users",
  // 	});
  // 	models.Idea.belongsToMany(User, {
  // 		through: models.User_Idea,
  // 		foreignKey: "ideaId",
  // 		as: "ideas",
  // 	});
  ///////// doner
  // User.belongsToMany(models.Idea, {
  // 	through: models.Donor_Idea,
  // 	foreignKey: "donorId",
  // 	as: "users",
  // });
  // models.Idea.belongsToMany(User, {
  // 	through: models.Donor_Idea,
  // 	foreignKey: "ideaId",
  // 	as: "ideas",
  // });
  //};
  return User;
};
