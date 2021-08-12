const { Idea } = require("../db/models");

exports.fetchIdea = async (ideaId, next) => {
  try {
    const idea = await Idea.findByPk(ideaId);
    return idea;
  } catch (error) {
    next(error);
  }
};

exports.ideaCreat = async (req, res, next) => {
  try {
    if (req.files) {
      req.body.ideaPicture = `http://${req.get("host")}/${
        req.files.ideaPicture[0].path
      }`;
      req.body.ideaPdf = `http://${req.get("host")}/${
        req.files.ideaPdf[0].path
      }`;
    }

    req.body.userId = req.user.id;
    const newIdea = await Idea.create(req.body);
    res.status(201).json(newIdea);
  } catch (error) {
    next(error);
  }
};

exports.ideaList = async (req, res) => {
  try {
    const ideas = await Idea.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
