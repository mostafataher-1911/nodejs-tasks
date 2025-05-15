const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/User");

exports.signup = async (req, res, next) => {
  try {
    const { email, password, passwordConfirm } = req.body;
    if (!password || !passwordConfirm) return res.status(400).json({ message: "Passwords required" });
    if (password !== passwordConfirm) return res.status(400).json({ message: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await promisify(jwt.sign)(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
