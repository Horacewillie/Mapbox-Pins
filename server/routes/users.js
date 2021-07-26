const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const saltRounds = 10;

//Register User
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields must be complete" });
    } else {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password.toString(), salt);
      const newlyRegisteredUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      let registeredUser = await newlyRegisteredUser.save();
      res.status(201).json({ success: true });
    }
  } catch (err) {
    res.status(400).send({
      message: err,
    });
  }
});

//Login User

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }
    const validPassword = await bcrypt.compare(
      password.toString(),
      user.password.toString()
    );
    !validPassword && res.status(400).json({ message: "Incorrect password" });

    return res.status(200).json({ id: user._id, username: user.username });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
