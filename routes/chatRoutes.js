const express = require("express");
const upload = require("../middleware/multer");
const passport = require("passport");

const router = express.Router();

const {
  chatDelete,
  chatList,

  chatCreate,
  fetchChat,
} = require("../controllers/chatController");

router.param("chatId", async (req, res, next, chatId) => {
  const chat = await fetchChat(chatId, next);
  if (chat) {
    req.chat = chat;
    next();
  } else {
    const err = new Error("Chat Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", chatList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  chatCreate
);

router.delete(
  "/:chatId",
  passport.authenticate("jwt", { session: false }),
  chatDelete
);

module.exports = router;