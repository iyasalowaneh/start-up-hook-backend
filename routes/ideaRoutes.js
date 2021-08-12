const passport = require("passport");
const multer = require("multer");
const {
  ideaCreat,
  fetchIdea,
  ideaList,
} = require("../controllers/ideaController");
const express = require("express");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

router.param("ideaId", async (req, res, next, ideaId) => {
  const idea = await fetchIdea(ideaId, next);
  if (idea) {
    req.idea = idea;

    next();
  } else {
    const err = new Error("idea not found");
    err.status = 404;
    next(err);
  }
});

router.get("/", ideaList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.fields([
    { name: "ideaPicture", maxCount: 1 },
    { name: "ideaPdf", maxCount: 1 },
  ]),
  ideaCreat
);

module.exports = router;