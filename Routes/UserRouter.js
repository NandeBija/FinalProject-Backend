const router = require("express").Router();
const User = require("../Models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../Middleware/authenticate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUser } = require("../Middleware/find");

// GET ALL USER
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET ONE USER
router.get("/:id", [verifyTokenAndAdmin, getUser], (req, res, next) => {
  const user = req.params.id;
  res.send(res.user);
});

// REGISTER A USER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const user = await newUser.save();
    try {
      const access_token = jwt.sign(
        JSON.stringify(newUser),
        process.env.ACCESS_TOKEN_SECRET
      );

      res.status(201).json({ jwt: access_token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// LOGIN USER WITH EMAIL AND PASSWORD
router.patch("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) res.status(404).json({ message: "Could not find user" });
  if (await bcrypt.compare(password, user.password)) {
    try {
      const access_token = jwt.sign(
        JSON.stringify(user),
        process.env.MONGO_PASS
      );
      res.status(201).json({ jwt: access_token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res
      .status(400)
      .json({ message: "Email and password combination do not match" });
  }
});

//UPDATE USERS
router.put(
  "/:id",
  [verifyTokenAndAuthorization, getUser],
  async (req, res, next) => {
    const { name, email, password, profilePicture } = req.body;
    if (name) res.user.name = name;
    if (email) res.user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      res.user.password = hashedPassword;
    }
    if (profilePicture) res.user.profilePicture = profilePicture;

    try {
      const updatedUser = await res.user.save();
      res.status(201).send(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// DELETE A USER
router.delete(
  "/:id",
  [verifyTokenAndAuthorization, getUser],
  async (req, res, next) => {
    const user = { id: req.params.id };
    try {
      await res.user.remove();
      res.json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
