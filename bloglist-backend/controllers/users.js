const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/users");
const { error } = require("../utils/logger");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    comments: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;

  if (!password) {
    return response.status(400).json({ error: "password is required" });
  } else if (password.length < 3) {
    return response.status(400).json({
      error:
        "User validation failed: password is shorter than the minimum allowed length (3).",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
