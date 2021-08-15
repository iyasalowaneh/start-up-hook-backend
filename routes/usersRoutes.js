const express = require("express");
const passport = require("passport");

//middleware
const upload = require("../middleware/multer");

//controllers
const {
  signup,
  signin,
  updateUser,
  usersList,
} = require("../controllers/usersController");

const router = express.Router();

router.param("userId", async (req, res, next, userId) => {
  const user = await fetchUser(userId, next);
  if (user) {
    req.user = user;
    next();
  } else {
    const err = new Error("user not found");
    err.status = 404;
    next(err);
  }
});

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
router.put(
  "/updateuser",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),

  updateUser
);
router.get("/users", usersList);

module.exports = router;
