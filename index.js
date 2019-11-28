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



swagerDoc(app);

app.use(express.json());
app.use(express.static(path.join(__dirname + '/public/')));
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use("/api/user", authRoute);
app.use("/api/getInfo", postRoute);
app.use("/api/users", usersRoute);

app.listen(3000, () => console.log("server are stared"));
