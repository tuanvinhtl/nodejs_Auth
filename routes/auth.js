const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { loginValidation, registerValidation } = require("../validation");
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
  // validate before we submit data
  const validation = registerValidation(req.body);

  if (validation.error) return res.status(400).send(validation);

  const emailExist = await User.findOne({
    email: req.body.email
  });

  if (emailExist) return res.status(400).send("Email already exists");

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });
  try {
    const saveUser = await user.save();
    res.send({ userId: saveUser._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  // validate before we submit data
  const validation = loginValidation(req.body);

  if (validation.error) return res.status(400).send(validation);

  const user = await User.findOne({
    email: req.body.email
  });

  if (!user) return res.status(400).send("Email is not found");

  // password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) return res.status(400).send("Invalid password");

  // create and assign a token
  const token =jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{expiresIn:20});
  res.header('auth-token',token).send(token)
});

module.exports = router;
