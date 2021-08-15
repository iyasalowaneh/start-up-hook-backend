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

    req.body.ownerId = req.user.id;

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
        exclude: ["updatedAt"],
      },
    //   include: {
    //     model: User,
    //     as: "users",
    //     required: false,
    //     attributes: ["id"],
    //     through: {
    //       model: User_idea,
    //       as: "userIdeas",
    //       attributes: ["ideaId", "investorId"],
    //     },
    //  },
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

// exports.checkout = async (req, res, next) => {
//   const newOrder = await Order.create({ buyerId: req.user.id });
//   const cart = req.body.map((item) => ({
//     ...item,
//     orderId: newOrder.id,
//     itemId: item.productId,
//   }));

//   await Cart.bulkCreate(cart);

//   const finalOrder = {
//     ...newOrder.toJSON(),
//     items: req.body,
//   };
//   res.status(201).json(finalOrder);
// };

// exports.fundCreat = async (req, res, next) => {
//   try {
//     req.body.ideaId = req.idea.id;
//     req.body.investorId = req.user.id;

//     const newFund = await Idea.update(req.body);
//     res.status(201).json(newFund);

//     next({
//       status: 401,
//       message: "you can not create a Message",
//     });
//   } catch (error) {
//     next(error);
//   }
// };