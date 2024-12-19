require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Service = require('../schemas/servicesSchema.jsx');

// ___________________________create a service___________________________
let createService = async (req, res) => {
  // Destructure the request body to get the service details
  const {
    title,
    body,
    category,
    image,
    address,
    city,
    country,
    zip,
    phone,
    status,
  } = req.body;
  // Get the user ID from the request parameters
  const userId = req.params.id;

  try {
    // Check if all required fields are provided
    if (
      !title ||
      !body ||
      !category ||
      !address ||
      !city ||
      !country ||
      !zip ||
      !phone
    ) {
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
    const { query } = req.query; // Extract the search query from query params

    let services;
    if (query) {
      // If a search query is provided, filter the services by the fields listed
      services = await Service.find({
        $or: [
          {
            title: {
              $regex: query, // Use regular expression to match the 'title' field with the value in the 'query' variable
              $options: 'i', // Make the search case-insensitive (i.e., 'plumbing' will match 'Plumbing', 'PLUMBING', etc.)
            },
          },
          { body: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
          { address: { $regex: query, $options: 'i' } },
          { city: { $regex: query, $options: 'i' } },
          { country: { $regex: query, $options: 'i' } },
          { zip: { $regex: query, $options: 'i' } },
          { phone: { $regex: query, $options: 'i' } },
          // Match against populated user fields
          { 'userId.username': { $regex: query, $options: 'i' } },
          { 'userId.firstName': { $regex: query, $options: 'i' } },
          { 'userId.lastName': { $regex: query, $options: 'i' } },
        ],
      }).populate('userId', 'username firstName lastName'); // Populate user info
    } else {
      // If no query is provided, return all services
      services = await Service.find().populate(
        'userId',
        'username firstName lastName'
      );
    }

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ___________________________update a service___________________________

// In the updateService function:
const updateService = async (req, res) => {
  const serviceId = req.params.id;
  const userId = req.user._id; // Extract the user ID from the request object

  const {
    title,
    body,
    category,
    image,
    address,
    city,
    country,
    zip,
    phone,
    status,
  } = req.body;

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Compare service userId with the logged-in userId (_id)
    if (service.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: `You don't have access to this service` });
    }

    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      {
        title,
        body,
        category,
        image,
        address,
        city,
        country,
        zip,
        phone,
        status,
      },
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

// ___________________________delete a service___________________________
let deleteService = async (req, res) => {
  const serviceId = req.params.id;
  const userId = req.user._id; // Extract the user ID from the request object

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Compare service userId with the logged-in userId (_id)
    if (service.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: `You don't have access to this service` });
    }

    await Service.findByIdAndDelete(serviceId);
    return res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: error.message });
  }
};

//__________get all services of one user__________
let getAllServicesOfOneUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const services = await Service.find({ userId });
    return res.status(200).json({ services });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: error.message });
  }
};

// __________get service by status__________
let getAllServicesByStatus = async (req, res) => {
  const status = req.params.status;
  try {
    const services = await Service.find({ status });
    return res.status(200).json({ services });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: error.message });
  }
};

// __________get service by category__________
let getAllServicesByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const services = await Service.find({ category });
    return res.status(200).json({ services });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
  getAllServicesOfOneUser,
};
