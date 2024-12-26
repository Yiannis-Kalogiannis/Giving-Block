const express = require('express');
const router = express.Router();


const {
  getAllUsers,
  userLogin,
  userRegister,
  userUpdate,
  getUserById,
  deleteAllUsers,
  deleteUser,  
} = require('../controllers/userController.jsx');
const  verifyToken  = require('../middleware/auth.jsx');

// _________private routes_________

router.put('/updateUser/:id', verifyToken, userUpdate); // Route to update a user by their ID
router.get('/getUserById/:id',verifyToken, getUserById); // Route to get a user by their ID
router.get('/getAllUsers',verifyToken, getAllUsers); // Route to get all users
router.delete('/deleteAllUsers',verifyToken, deleteAllUsers); // Route to delete all users
router.delete('/deleteUser/:id',verifyToken, deleteUser); // Route to delete a user by their ID

// _________public routes_________
router.post('/login', userLogin); // Route to login a user
router.post('/register', userRegister); // Route to register a user

module.exports = router;
