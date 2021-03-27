// UTILS
const path = require("path");

const express = require("express");

// MONGOOSE
const mongooseConnect = require("./util/mogooseConnect.s");

// PASERS
const bodyParser = require("body-parser");
const multer = require("multer");

// ROUTERS
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const feedRouter = require("./routes/feed");
const storyRouter = require("./routes/story");
const replyrRouter = require("./routes/reply");
const activityRouter = require("./routes/activity");
const conversationRouter = require("./routes/conversation");
const dmRouter = require("./routes/dm");
const followRouter = require("./routes/follow");

const app = express();

// MULTER CONFIG
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        file.originalname.split(".")[0] +
        ".s." +
        file.originalname.split(".")[1]
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// PARSERS
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// STATIC FOLDER
app.use("/images", express.static(path.join(__dirname, "images")));

// DEFAULT RESPONSE HEADER SETTING
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Controll-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ROUTES
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/feed", feedRouter);
app.use("/story", storyRouter);
app.use("/reply", replyrRouter);
app.use("/activity", activityRouter);
app.use("/conversation", conversationRouter);
app.use("/dm", dmRouter);
app.use("/follow", followRouter);

// ERROR HANDLING MIDDLEWARE
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  return res.status(statusCode).json({ message: message });
});
mongooseConnect(app);
