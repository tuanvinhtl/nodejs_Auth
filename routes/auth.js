const router = require('express').Router();
const User = require('../model/User');
const { loginValidation, registerValidation } = require('../validation');

router.post('/register', async (req, res) => {

    // validate before we submit data
    const validation = registerValidation(req.body);

    if (validation.error) return res.status(400).send(validation);

    const emailExist = await User.findOne({
        email: req.body.email
    });

    if (emailExist) return res.status(400).send('Email already exists');

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const saveUser = await user.save();
        res.send(saveUser);
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;