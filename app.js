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

mongooseConnect(app);
