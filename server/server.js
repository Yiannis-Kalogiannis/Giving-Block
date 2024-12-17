const express = require('express');
const cors = require('cors');
const path = require('path'); 
const userRoutes = require("./routes/userRoutes.js");


const connection = require('./config/connection.js');
const port = 8080;

// middleware
const app = express();
app.use(express.json());
app.use(cors());

// User routes
app.use('/users', userRoutes);

// Static files for uploads
console.log(path.join(__dirname, 'uploads'));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Start the server
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

