const express = require("express");

const passport = require("passport");
let {
  messageCreat,
  messageList,
  fetchMessage,
} = require("../controllers/messageController");
let { fetchUser } = require("../controllers/usersController");

const router = express.Router();
router.param("senderId", async (req, res, next, senderId) => {
  const user = await fetchUser(senderId, next);
  if (user) {
    req.user = user;
    next();
  } else {
    const err = new Error("user not found");
    err.status = 404;
    next(err);
  }
});

router.get("/messages", messageList);
router.post(
  "/messageCreat",
  passport.authenticate("jwt", { session: false }),
  messageCreat
);

module.exports = router;
