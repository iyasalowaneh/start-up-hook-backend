module.exports = User_Idea = (sequelize, DataTypes) => {
	const Donor_Idea = sequelize.define("Donor_Idea", {
		donorId: {
			type: DataTypes.INTEGER,
		},
		ideaId: {
			type: DataTypes.INTEGER,
		},
		amount: { type: DataTypes.INTEGER },
	});
	Donor_Idea.associate = (models) => {
		models.User.belongsToMany(models.Idea, {
			through: Donor_Idea,
			foreignKey: "donorId",
		});
		models.Idea.belongsToMany(models.User, {
			through: Donor_Idea,
			foreignKey: "ideaId",
		});
	};

	return Donor_Idea;
};
