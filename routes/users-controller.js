const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

router.get("/pagging", verify, async (req, res) => {
  try {
    const { page, perPage } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(perPage, 10)
    };
    const users = await User.paginate({}, options);
    res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/findbyid", verify, async (req, res) => {
  try {
    const { id } = req.query;
    res.send(await User.deleteOne(id));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/deletebyid", verify, async (req, res) => {
  try {
    const { id } = req.query;
    res.send(await User.findByIdAndDelete(id));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getall", verify, async (req, res) => {
  User.find({}, function(err, users) {
    var userMap = {};
    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    res.send(userMap);
  });
});

module.exports = router;
