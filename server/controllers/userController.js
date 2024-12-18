require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../schemas/usersSchema');

const saltRounds = +process.env.SALT_ROUNDS;

// _________________get all users (for admin uses, i won't use it here)_______________
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

//_________________delete all users (for admin uses, i won't use it here)____________________
let deleteAllUsers = {
  //code here
}

//____________ user login ____________

let userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const registeredUser = await User.findOne({ email });

    // empty fields check
    if (!email || !password) {
      return res.status(400).json({ message: 'Both field are required' });
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
      return res.status(401).json({ message: 'Password incorrect' });
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
    return res.status(200).json({ message: 'Welcome back!', token });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).send(`backend: User not found, please try again later`);
  }
};

// _________________register new user_______________

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

let userRegister = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    username,
    bio,
    profilePicture,
  } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required!!' });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters and contain both letters and numbers!',
      });
    }
    const userExist = await User.findOne({ $or: [{ email }, { username }] }); //check both username and email if they exist

    if (userExist) {
      if (userExist.email === email) {
        console.log('Email already exists');
        return res.status(400).json({
          message: `Email already exists! Please log in or register with a different email.`, //message to user if email already exists
        });
      }

      if (userExist.username === username) {
        console.log('Username already exists');
        return res.status(400).json({
          message: `Username already exists! Please choose a different username.`, //message to user if username already exists
        });
      }
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
      profilePicture: profileImage,
      bio,
      username,
    };
    const createdUser = await User.create(newUser);

    console.log({ message: 'User created successfully' });

    return res.status(201).json({
      message: 'User created successfully',
      user: createdUser, //return the created user
      userId: createdUser._id
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: `backend: Failed to create a new user` });
  }
};


//_________________update user profile____________________
let userUpdate = async (req, res) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  try {
    const id = req.params.id;
    const { firstName, lastName, email, newPassword, bio, profilePicture, username, oldPassword } = req.body;
    const oldUser = await User.findById({ _id: id });

    // check if user exists
    if (!oldUser) { 
      console.log(`User does not exists`);
      return res.status(404).json({ message: 'User does not exists' });
    }

    if (!passwordRegex.test(newPassword)) {
      return res.status(422).json({
        message:
          "Password must be at least 8 characters and contain both letters and numbers!",
      });
    }
    if (!oldUser) {
      console.log("User does not exist");
      return res.status(404).json({ message: "User does not exist" });
    }

    // password check
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      oldUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Old password incorrect" });
    }

    const hashPassword = await bcrypt.hash(newPassword, saltRounds);

    const updatedUser = {
      firstName,
      lastName,
      email,
      newPassword: hashPassword,
      bio,
      profilePicture,
      username,
    }
    // Check if email or username already exists
    const userExist = await User.findOne({ $or: [{ email }, { username }] });
    if (userExist && userExist._id.toString() !== id) {
      if (userExist.email === email) {
      console.log('Email already exists');
      return res.status(400).json({
        message: `Email already exists! Please use a different email.`,
      });
      }

      if (userExist.username === username) {
      console.log('Username already exists');
      return res.status(400).json({
        message: `Username already exists! Please choose a different username.`,
      });
      }
    }
    const finalData = await User.findByIdAndUpdate ({_id: id}, updatedUser, { new: true }); // to return the updated user data after updating
    console.log(finalData);
    res.status(200).json({ message: 'User updated successfully', user: finalData });
} catch (error) {
  console.log(`Error updating user: ${error}`);
  res
    .status(500)
    .json({ message: "backend: Error updating user, try again later!" });
}
};


//_________________get user by id____________________
let getUserById ={
  //code here
}








module.exports = { getAllUsers, userLogin, userRegister, userUpdate };
