const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.image.jsx');

const {
  getAllUsers,
  userLogin,
  userRegister,
  userUpdate,
  getUserById,
  deleteAllUsers,
} = require('../controllers/userController');

// _________private routes_________

router.put('/updateUser/:id', userUpdate); // Route to update a user by their ID
router.get('/getUserById/:id', getUserById); // Route to get a user by their ID
router.get('/getAllUsers', getAllUsers); // Route to get all users
router.delete('/deleteAllUsers', deleteAllUsers); // Route to delete all users


// _________public routes_________
router.post('/login', userLogin); // Route to login a user
router.post('/register', upload, userRegister); // Route to register a user

module.exports = router;
