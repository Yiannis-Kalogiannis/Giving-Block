const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.image.jsx');

const {
    getAllUsers,
    userLogin,
    userRegister
} = require('../controllers/userController');






// public routes
router.post("/login", userLogin);
router.post("/register", userRegister);

module.exports = router;
