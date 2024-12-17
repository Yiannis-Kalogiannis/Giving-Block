require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../schemas/usersSchema');

const saltRounds = +process.env.SALT_ROUNDS;

// _________________get all users (for admin uses)_______________
let getAllUsers = async (req, res) => {
    try {
      const allUsers = await User.find();
      res.json(allUsers);
    } catch (error) {
      console.log(`Error: ${error}`);
      res
        .status(500)
        .send(`backend: Failed to retrieve all users, please try again later`);
    }
  };

  //____________ user login ____________

  let userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const registeredUser = await User.findOne({ email });

// empty fields check
if (!email || !password) {
    return res.status(400).json({ message: "Both field are required" });
  }

  // email  check
  if (!registeredUser) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  // password check
  const isPasswordCorrect = await bcrypt.compare(
    password,
    registeredUser.password
  );
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Password incorrect" });
  }
   // token implementation
   let payload = {
    firstName: registeredUser.firstName,
    lastName: registeredUser.lastName,
    image: registeredUser.image,
    id: registeredUser._id,
  };

  let token = jwt.sign(payload, process.env.SECRET_KEY);

  // console.log(token);

  // passed all filters to log in
  return res.status(200).json({ message: "Welcome back!", token });
} catch (error) {
  console.log(`Error: ${error}`);
  res.status(500).send(`backend: User not found, please try again later`);
}
};