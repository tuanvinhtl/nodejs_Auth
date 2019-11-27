const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const swagerDoc = require('./swaggerDoc');
const path = require('path');

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    console.log(err);
  }
);

const authRoute = require("./routes/auth");
const postRoute = require("./routes/getInfoDatatable");
const usersRoute = require("./routes/users-controller");


app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
swagerDoc(app);

app.use(express.json());
app.use(express.static(path.join(__dirname + '/public/')));

app.use("/api/user", authRoute);
app.use("/api/getInfo", postRoute);
app.use("/api/users", usersRoute);

app.listen(3000, () => console.log("server are stared"));
