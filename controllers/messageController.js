let { Message } = require("../db/models");

exports.messageCreat = async (req, res, next) => {
  try {
    req.body.senderId = req.user.id;
    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage);

    next({
      status: 401,
      message: "you can not create a Message",
    });
  } catch (error) {
    next(error);
  }
};

exports.messageList = async (req, res) => {
  try {
    const messages = await Message.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.fetchMessage = async (messageId, next) => {
  try {
    const message = await Message.findByPk(messageId);

    return message;
  } catch (error) {
    next(error);
  }
};
