const express = require("express");

// MONGOOSE
const mongooseConnect = require("./util/mogooseConnect.s");

// ROUTERS
const userRouter = require("./routes/user");
const feedRouter = require("./routes/feed");
const storyRouter = require("./routes/story");
const replyrRouter = require("./routes/reply");
const activityRouter = require("./routes/activity");
const conversationRouter = require("./routes/conversation");
const dmRouter = require("./routes/dm");

const app = express();

app.use("/user", userRouter);
app.use("/feed", feedRouter);
app.use("/story", storyRouter);
app.use("/reply", replyrRouter);
app.use("/activity", activityRouter);
app.use("/conversation", conversationRouter);
app.use("/dm", dmRouter);

mongooseConnect(app);
