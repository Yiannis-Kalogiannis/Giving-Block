const express = require('express');
const cors = require('cors');
const path = require('path'); 
const userRoutes = require("./routes/userRoutes.jsx");
const serviceRoutes = require("./routes/serviceRoutes.jsx");
require("dotenv").config();

const connection = require('./config/connection.jsx');
const port = process.env.PORT;

// middleware
const app = express();
app.use(express.json());
app.use(cors());

// User routes
app.use('/users', userRoutes);
app.use('/services', serviceRoutes);

// Static files for uploads
console.log(path.join(__dirname, 'uploads'));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Start the server
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

