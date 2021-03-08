const express = require("express");

const mongooseConnect = require("./util/mogooseConnect.s");

const app = express();

mongooseConnect(app);
