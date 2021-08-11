const express = require("express");
const passport = require("passport");

//middleware
const upload = require("../middleware/multer");

//controllers
const { signup, signin } = require("../controllers/usersController");

const router = express.Router();

router.post(
  "/signup",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "idPicture", maxCount: 1 },
  ]),
  signup
);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
