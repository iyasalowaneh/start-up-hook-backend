const { Chat, UserChat } = require("../db/models");

exports.fetchChat = async (chatId, next) => {
  try {
    const foundChat = await Chat.findByPk(chatId);
    return foundChat;
  } catch (error) {
    next(error);
  }
};

exports.chatList = async (req, res, next) => {
  try {
    const chat = await Chat.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(chat);
  } catch (error) {
    next(error);
  }
};

exports.chatCreate = async (req, res, next) => {
  try {
    let users = JSON.parse(req.body.users);
    console.log(users);
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }

    req.body = { name: req.body.name, image: req.body.image };

    const newChat = await Chat.create(req.body);
    console.log(req.body.users);
    const idsArry = users.map(
      (user) => (user = { userId: user, chatId: newChat.id })
    );

    UserChat.bulkCreate(idsArry);
    res.status(201).json(newChat);
  } catch (error) {
    next(error);
  }
};

exports.chatDelete = async (req, res, next) => {
  try {
    await UserChat.destroy({ where: { chatId: req.chat.id } });
    await req.chat.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};