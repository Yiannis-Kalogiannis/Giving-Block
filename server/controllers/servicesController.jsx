require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Service = require('../schemas/servicesSchema.jsx');
const uploadImage = require('../utility/upload.image.jsx');

// ___________________________create a service___________________________

const createService = async (req, res) => {
  // Destructure the request body to get the service details
  const {
      title,
      body,
      category,
      serviceImage,
      address,
      city,
      country,
      zip,
      phone,
      status,
      serviceType,
      username,
  } = req.body;

  // Get the user ID from the request parameters (URL parameter)
  const userId = req.params.id;  // Extract the user ID from the request object 

  try {
      // Check if all required fields are provided
      if (
          !title ||
          !body ||
          !address ||
          !city ||
          !country ||
          !zip ||
          !phone ||
          !serviceType
      ) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      let image = '';
      if (req.files && req.files.serviceImage) {
          image = await uploadImage(req.files.serviceImage.tempFilePath); // Cloudinary upload
      }

      // Create a new service object with the provided details
      const newService = {
          title,
          body,
          userId, // Use the user ID from params
          status,
          serviceImage: image,
          address,
          city,
          country,
          zip,
          phone,
          serviceType,
          username, // Add username to the service object
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





// __________get all services (with flexible filters)__________

let getAllServices = async (req, res) => {
  try {
    const { query, status,serviceType, filteredUserId } = req.query; // Extract query, status, and category from query params

    let filter = {}; // Start with an empty filter object

    // Add search query filter if it exists
    if (query) {
      filter.$or = [
        { body: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } },
        
        { address: { $regex: query, $options: 'i' } },
        { city: { $regex: query, $options: 'i' } },
        { country: { $regex: query, $options: 'i' } },
        { zip: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
        { 'userId.username': { $regex: query, $options: 'i' } },
        { 'userId.firstName': { $regex: query, $options: 'i' } },
        { 'userId.lastName': { $regex: query, $options: 'i' } },
        { 'userId.email': { $regex: query, $options: 'i' } },
        
      ];
    }

    // Add status filter if provided
    if (status !== undefined) {
      filter.status = status === 'true'; // Convert status to Boolean (true/false)
      // console.log(filter.status);
    }

    
// Add serviceType filter if provided
    if(serviceType){
      filter.serviceType = serviceType;
      // console.log(filter.serviceType);
    }

     // Add userId filter if provided
     if (filteredUserId) {
      filter.userId = filteredUserId; 
    }


    // Fetch the services based on the constructed filter
    const services = await Service.find(filter).populate(
      'userId',
      'username firstName lastName email profilePicture _id'
    ); // Populate user info

    res.status(200).json(services);
  } catch (error) {
    console.error('Server Error:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ___________________________update a service___________________________
const updateService = async (req, res) => {
  const serviceId = req.params.id;
  const userId = req.user._id; // Extract the user ID from the request object

  const {
    title,
    body,
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
  try {
    const { query, status, serviceType } = req.query; // Extract query, status, and serviceType from query params
    const userId = req.user.id;   // Extract the user ID from the request object

    let filter = { userId }; // Filter to get only the logged-in user's services

    // Add search query filter if it exists
    if (query) {
      filter.$or = [
        { body: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } },
        { address: { $regex: query, $options: 'i' } },
        { city: { $regex: query, $options: 'i' } },
        { country: { $regex: query, $options: 'i' } },
        { zip: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
      ];
    }

    // Add status filter if provided
    if (status !== undefined) {
      filter.status = status === 'true'; // Convert status to Boolean (true/false)
    }

    // Add serviceType filter if provided
    if (serviceType) {
      filter.serviceType = serviceType;
    }

    // Fetch the services based on the constructed filter and userId
    const services = await Service.find(filter).populate(
      'userId',
      'username firstName lastName email profilePicture'
    ); // Populate user info

    res.status(200).json(services); // Return the filtered services
  } catch (error) {
    console.error('Server Error:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
  getAllServicesOfOneUser,
};
