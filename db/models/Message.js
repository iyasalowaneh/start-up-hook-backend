const SequelizeSlugify = require("sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    content: {
      type: DataTypes.STRING,
    },
  });
  SequelizeSlugify.slugifyModel(Message, {
    source: ["name"],
  });
  Message.associate = (models) => {
    models.User.hasMany(Message, {
      foreignKey: "senderId",
      as: "Messages",
    });
    Message.belongsTo(models.User, {
      foreignKey: "senderId",
    });
    models.User.hasMany(Message, {
      foreignKey: "reciverId",
    });
    Message.belongsTo(models.User, {
      foreignKey: "reciverId",
    });
  };
  return Message;
};
