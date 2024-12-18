const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.image.jsx');


const {createService} = require('../controllers/servicesController.jsx');



router.post('/createService/:id', upload, createService); // Route to create a service


module.exports = router;