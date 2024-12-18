require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Service = require('../schemas/servicesSchema.jsx');

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

// __________update a service__________

// __________delete a service__________

// __________delete all services__________

//__________get all services of one user__________

// __________get service by status__________

// __________get service by category__________


module.exports = { createService };