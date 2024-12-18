const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.image.jsx');

const {
    getAllUsers,
    userLogin,
    userRegister,
    userUpdate,
} = require('../controllers/userController');


// private routes
router.put("/updateUser/:id", userUpdate);



// public routes
router.post("/login", userLogin);
router.post("/register",upload,  userRegister);

module.exports = router;
