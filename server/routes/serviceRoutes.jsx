const express = require('express');
const router = express.Router();

const  verifyToken  = require('../middleware/auth.jsx');


const {createService, getAllServices, updateService, deleteService, getAllServicesOfOneUser} = require('../controllers/servicesController.jsx');



router.post('/createService/:id', verifyToken, createService); // Route to create a service
router.get('/getAllServices', getAllServices); // Route to get all services
router.put('/updateService/:id', verifyToken, updateService); // Route to update a service by its ID
router.delete('/deleteService/:id',verifyToken, deleteService); // Route to delete a service by its ID
router.get('/getAllServicesOfOneUser/:id',verifyToken, getAllServicesOfOneUser); // Route to get all services of one user


module.exports = router;