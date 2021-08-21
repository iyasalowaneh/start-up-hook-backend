const { Idea, User_Idea, Donor_Idea } = require("../db/models");

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
		const ideas = await Idea.findAll();
		res.json(ideas);
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

exports.ideaUser = async (req, res) => {
	try {
		const ideaUsers = await User_Idea.findAll();
		res.json(ideaUsers);
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};

exports.fundIdea = async (req, res, next) => {
	try {
		if (req.file) {
			req.body.agreement = `http://${req.get("host")}/media/${
				req.file.filename
			}`;
		}
		req.body.investorId = req.user.id;
		req.body.ideaId = req.idea.id;
		const idea = await Idea.findByPk(req.body.ideaId);
		if (idea) {
			await User_Idea.create(req.body);
			await idea.update({
				recievedFund: parseInt(idea.recievedFund) + parseInt(req.body.amount),
			});
		}
		res.status(201).json(idea);
	} catch (error) {
		next(error);
	}
};

exports.donorIdea = async (req, res, next) => {
	try {
		req.body.donorId = 1000;
		req.body.ideaId = req.idea.id;
		const idea = await Idea.findByPk(req.body.ideaId);
		if (idea) {
			await Donor_Idea.create(req.body);
			await idea.update({
				recievedFund: parseInt(idea.recievedFund) + parseInt(req.body.amount),
			});
		}
		res.status(201).json(idea);
	} catch (error) {
		next(error);
	}
};

exports.ideaUpdate = async (req, res, next) => {
	try {
		await req.idea.update(req.body);
		res.status(201).json(req.idea);
	} catch (error) {
		next(error);
	}
};

exports.donorUser = async (req, res) => {
	try {
		const donorUser = await Donor_Idea.findAll();
		res.json(donorUser);
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
};
