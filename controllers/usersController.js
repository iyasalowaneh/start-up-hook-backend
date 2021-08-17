const bcrypt = require("bcrypt");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/keys");
const jwt = require("jsonwebtoken");

//db
const { User } = require("../db/models");

exports.signup = async (req, res, next) => {
  try {
    if (req.files) {
      req.body.profilePicture = `http://${req.get("host")}/${
        req.files.profilePicture[0].path
      }`;
      req.body.idPicture = `http://${req.get("host")}/${
        req.files.idPicture[0].path
      }`;
    }
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
    const hashedConfirmPassword = await bcrypt.hash(
      req.body.confirmPassword,
      saltRound
    );

    req.body.password = hashedPassword;
    req.body.confirmPassword = hashedConfirmPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
exports.signin = (req, res) => {
  const token = generateToken(req.user);
  res.json({ token });
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePicture: user.profilePicture,
    email: user.email,
    type: user.type,
    slug: user.slug,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, "giveitasecretkey");
  return token;
};

exports.updateUser = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.user.update(req.body);
    res.status(201).json(req.user);
  } catch (error) {
    next(error);
  }
};

exports.fetchUser = async (userId, next) => {
  try {
    const user = await User.findByPk(userId);

    return user;
  } catch (error) {
    next(error);
  }
};

exports.usersList = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};
