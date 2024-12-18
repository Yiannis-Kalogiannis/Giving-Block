require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Service = require('../schemas/servicesSchema.jsx');


// ___________________________create a service___________________________
let createService = async (req, res) => {
    // Destructure the request body to get the service details
    const { title, body, category, image, address, city, country, zip, phone, status } = req.body;
    // Get the user ID from the request parameters
    const userId = req.params.id;
    
    try {
        // Check if all required fields are provided
        if (!title || !body || !category || !address || !city || !country || !zip || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Handle the uploaded image (optional)
        let serviceImage = null;
        if (req.file) {
            serviceImage = req.file.filename; // The filename assigned by multer
        }

        // Create a new service object with the provided details
        const newService = {
            title,
            body,
            category,
            userId, // Use the user ID from params
            status,
            image: serviceImage,
            address,
            city,
            country,
            zip,
            phone,
        };

        // Save the new service to the database
        const createdService = await Service.create(newService);
        console.log({ message: 'Service created successfully' });

        // Return a success response with the created service details
        return res.status(201).json({
            message: 'Service created successfully',
            service: createdService,
            serviceId: createdService._id,
        });
    } catch (error) {
        // Log the error and return a server error response
        console.log(`Error: ${error}`);
        res.status(500).json({ error: error.message });
    }
};



// __________get all services__________
let getAllServices = async (req, res) => {
    try {
        // Find all services in the database
        const services = await Service.find();
        // Return a success response with the services
        return res.status(200).json({ services });
    } catch (error) {
        // Log the error and return a server error response
        console.log(`Error: ${error}`);
        res.status(500).json({ error: error.message });
    }
}

// __________update a service__________

// In the updateService function:
const updateService = async (req, res) => {
    const serviceId = req.params.id;
    const userId = req.user._id;  // Extract the user ID from the request object

    const { title, body, category, image, address, city, country, zip, phone, status } = req.body;
  
    try {
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Compare service userId with the logged-in userId (_id)
        if (service.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: `You don't have access to this service` });
        }

        const updatedService = await Service.findByIdAndUpdate(
            serviceId,
            { title, body, category, image, address, city, country, zip, phone, status },
            { new: true }
        );
        
        return res.status(200).json({
            message: 'Service updated successfully',
            service: updatedService,
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: error.message });
    }
};





// __________delete a service__________

// __________delete all services__________

//__________get all services of one user__________

// __________get service by status__________

// __________get service by category__________


module.exports = { createService, getAllServices, updateService };