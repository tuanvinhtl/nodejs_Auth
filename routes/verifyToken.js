const jwt = require("jsonwebtoken");
const path = require('path');

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.sendFile(path.join(__dirname + '/render-page/login.html'));
    return res;
  };

  try {
    const bearer = token.replace(/^bearer\s/, '');
    const verifyed = jwt.verify(bearer, process.env.TOKEN_SECRET);
    req.user = verifyed;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}
