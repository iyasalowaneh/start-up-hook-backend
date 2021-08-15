const { Idea,User_Idea } = require("../db/models");

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

    req.body.Id = req.user.id;

    const newIdea = await Idea.create(req.body);
    res.status(201).json(newIdea);
  } catch (error) {
    next(error);
  }
};

exports.ideaList = async (req, res) => {
  try {
    const ideas = await Idea.findAll({
     
    });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



exports.fundIdea = async (req, res, next) => {
 
  try {
    req.body.investorId=req.user.id
    req.body.ideaId = req.idea.id;
    const idea = await Idea.findByPk(req.body.ideaId);
    if(idea){
    await User_Idea.create(req.body)
    await idea.update({recievedFund:parseInt(idea.recievedFund)+parseInt(req.body.amount)})
  }
    res.status(201).json(idea);
  } catch (error) {
    next(error);
  }
};

