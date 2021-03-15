const express = require("express");

// UTILS
const uuid = require("uuid");

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

const app = express();

// MULTER CONFIG
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  fileName: (req, file, cb) => {
    cb(null, uuid.v4() + "-" + file.originalname);
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

// DEFAULT RESPONSE HEADER SETTING
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Controll-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
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

// ERROR HANDLING MIDDLEWARE
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  return res.status(statusCode).json({ message: message });
});
mongooseConnect(app);
