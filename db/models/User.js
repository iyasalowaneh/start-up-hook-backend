const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    confirmPassword:{ type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING },
    profilePicture :{ type: DataTypes.STRING },
    idPicture:{ type: DataTypes.STRING },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
  SequelizeSlugify.slugifyModel(User, { source: ["firstName","lastName"] });

 
  return User;
};
