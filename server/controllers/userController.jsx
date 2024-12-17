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




/ _________________create new user and save in DB for register_______________

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

let addNewUser = async (req, res) => {
  const { firstName, lastName, email, password, } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required!!" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and contain both letters and numbers!",
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      console.log({ message: "Email already exists" });
      return res.status(400).json({
        message: `Email already exists!, login or please register with different credentials`,
      });
    }


     //  Handle the uploaded image (optional)
     let profileImage = null;
     if (req.file) {
       profileImage = req.file.filename; // The filename assigned by multer
      }

    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashPassword,
      image: profileImage,
    };
    const createdUser = await User.create(newUser);

    // token implementation
    let payload = {
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      image: createdUser.image,
      id: createdUser._id,
    };

    let token = jwt.sign(payload, process.env.SECRET_KEY);

    // console.log(token);

    console.log({ message: "User created successfully" });

    return res.status(201).json({
      message: "User created successfully",
      user: createdUser,
      token,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: `backend: Failed to create a new user` });
  }
};