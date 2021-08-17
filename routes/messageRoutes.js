const express = require("express");
const upload = require("../middleware/multer");
const passport = require("passport");

const router = express.Router();

const {
  messageDelete,
  messageList,
  messageCreate,
  fetchMessage,
} = require("../controllers/messageController");

router.param("messageId", async (req, res, next, messageId) => {
  const message = await fetchMessage(messageId, next);
  if (message) {
    req.message = message;
    next();
  } else {
    const err = new Error("Message Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", messageList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  messageCreate
);

router.delete(
  "/:messageId",
  passport.authenticate("jwt", { session: false }),
  messageDelete
);

module.exports = router;