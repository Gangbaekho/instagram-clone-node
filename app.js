const express = require("express");

// MONGOOSE
const mongooseConnect = require("./util/mogooseConnect.s");

// PASERS
const bodyParser = require("body-parser");

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

// PARSERS
app.use(bodyParser.json());

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
  switch (error.statusCode) {
    case 401:
      res.status(401).json({ message: "Authentication error" });
    case 404:
      res.status(404).json({ message: "Not found page" });
    case 422:
      res.status(422).json({ message: "Invalid input value" });
    case 500:
      res.status(500).json({ message: "Internal server error" });
    default:
      res.status(500).json({ message: "Internal server error" });
  }
  return;
});
mongooseConnect(app);
