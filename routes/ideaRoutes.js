const passport = require("passport");
const multer = require("multer");
const {
  ideaCreat,
  fetchIdea,
  ideaList,
  fundIdea,
  ideaUser,
  ideaUpdate,
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
router.get("/ideausers", ideaUser);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.fields([
    { name: "ideaPicture", maxCount: 1 },
    { name: "ideaPdf", maxCount: 1 },
  ]),
  ideaCreat
);

router.put(
  "/:ideaId",
  passport.authenticate("jwt", { session: false }),
  upload.single("agreement"),
  fundIdea
);

router.put(
  "/idea/:ideaId",
  passport.authenticate("jwt", { session: false }),
  ideaUpdate
);
module.exports = router;
