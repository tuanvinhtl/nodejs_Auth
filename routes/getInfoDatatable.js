const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

router.get("/", verify, async (req, res) => {
  const {page,perPage} = req.query;

  const options = {
    page: parseInt(page,10),
    limit: parseInt(perPage,10),
  }

  try {
    const users = await User.paginate({},options);
    res.send(users);  
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

