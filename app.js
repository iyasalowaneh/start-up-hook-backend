const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const path = require("path");

//routes
const userRoutes = require("./routes/usersRoutes");
const ideasRoutes = require("./routes/ideaRoutes");
const messageRoutes = require("./routes/messageRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();
app.use(cors());
app.use(express.json());

//Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routes
app.use("/", userRoutes);
app.use("/ideas", ideasRoutes);
app.use("/messages", messageRoutes);
app.use("/chats", chatRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

//error middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});
app.use((req, res, next) => {
  res.status(404).json({ message: "path not found" });
});

app.listen(8000);
