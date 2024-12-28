require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../schemas/usersSchema.jsx');
const uploadImage = require('../utility/upload.image.jsx');

const saltRounds = +process.env.SALT_ROUNDS;

// ___________________________get all users (for admin uses, and maybe for chat functionality)___________________________
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

// ___________________________delete all users (for admin uses, i won't use it here)___________________________
let deleteAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany();

    res.status(200).json({
      message: 'All users deleted successfully',
      deletedCount: `${result.deletedCount} users deleted`,
    });
  } catch (error) {
    console.log(`Error deleting user: ${error}`);
    res
      .status(500)
      .json({ message: 'backend: Error deleting user, try again later!' });
  }
};

// ___________________________user login___________________________
let userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const registeredUser = await User.findOne({ email });

    // empty fields check
    if (!email || !password) {
      return res.status(400).json({ message: 'Both field are required' });
    }

    // email check
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
      image: registeredUser.profilePicture,
      userId: registeredUser._id,
      username: registeredUser.username,
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

// ___________________________register new user___________________________
let userRegister = async (req, res) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  const { firstName, lastName, email, password, username, bio } = req.body;

  try {
    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    // Validate password strength
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters and contain both letters and numbers!',
      });
    }

    // Check if email or username already exists
    const userExist = await User.findOne({ $or: [{ email }, { username }] });
    if (userExist) {
      if (userExist.email === email) {
        console.log('Email already exists');
        return res.status(400).json({
          message: `Email already exists! Please log in or register with a different email.`,
        });
      }
      if (userExist.username === username) {
        console.log('Username already exists');
        return res.status(400).json({
          message: `Username already exists! Please choose a different username.`,
        });
      }
    }

    // Handle profile image upload to Cloudinary (directly from file)
    let profileImage;
    if (req.files && req.files.profilePicture) {
      profileImage = await uploadImage(req.files.profilePicture.tempFilePath); // Cloudinary upload
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Create the user object
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashPassword,
      profilePicture: profileImage,
      bio,
      username,
    };

    // Create the new user in the database
    const createdUser = await User.create(newUser);

    console.log({ message: 'User created successfully' });

    // Return the created user response
    return res.status(201).json({
      message: 'User created successfully',
      user: createdUser,
      userId: createdUser._id,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(500).json({ message: 'Failed to create a new user' });
  }
};

// ___________________________update user profile___________________________
let userUpdate = async (req, res) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  try {
    // const idFromToken = req.user._id; // Extracted from JWT
    const idFromParams = req.params.id; // Extracted from the URL
    const {
      firstName,
      lastName,
      email,
      newPassword,
      bio,
      username,
      oldPassword,
    } = req.body;

    const oldUser = await User.findById(idFromParams);
    if (!oldUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    if (newPassword) {
      if (!passwordRegex.test(newPassword)) {
        return res
          .status(422)
          .json({
            message:
              'Password must be at least 8 characters and contain both letters and numbers!',
          });
      }
      const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        oldUser.password
      );
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Old password incorrect' });
      }
    }

    // Handle profile image upload to Cloudinary (directly from file)
    let profileImage = '';
    if (req.files && req.files.profilePicture) {
      profileImage = await uploadImage(req.files.profilePicture.tempFilePath); // Cloudinary upload
    }

    const updatedUser = {
      firstName,
      lastName,
      email,
      bio,
      profilePicture: profileImage,
      username,
    };
    if (newPassword) {
      updatedUser.password = await bcrypt.hash(newPassword, saltRounds);
    }

    const userExist = await User.findOne({
      $or: [{ email }, { username }],
      _id: { $ne: idFromParams },
    });
    if (userExist) {
      if (userExist.email === email)
        return res.status(400).json({ message: 'Email already exists!' });
      if (userExist.username === username)
        return res.status(400).json({ message: 'Username already exists!' });
    }

    const finalData = await User.findByIdAndUpdate(idFromParams, updatedUser, {
      new: true,
    });
    res
      .status(200)
      .json({ message: 'User updated successfully', user: finalData });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user!' });
  }
};

// ___________________________get user by id___________________________
let getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    return res.status(200).json({ message: 'Here is the user!', user });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json(`backend: User not found, please try again later`);
  }
};

let deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const userToDelete = await User.findByIdAndDelete({ _id: id });
    if (!userToDelete) {
      console.log(`User does not exist`);
      res.status(404).json({ message: 'You are not authorized' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(`Error deleting user: ${error}`);
    res
      .status(500)
      .json({ message: 'backend: Error deleting user, try again later!' });
  }
};

module.exports = {
  getAllUsers,
  userLogin,
  userRegister,
  userUpdate,
  getUserById,
  deleteAllUsers,
  deleteUser,
};
