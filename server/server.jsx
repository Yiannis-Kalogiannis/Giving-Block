const express = require('express');
const cors = require('cors');
const path = require('path'); 
const userRoutes = require("./routes/userRoutes.jsx");
const serviceRoutes = require("./routes/serviceRoutes.jsx");
const messageRoutes = require('./routes/messages.routes.jsx');require("dotenv").config();
const fileUpload = require('express-fileupload');

const app = express();

const connection = require('./config/connection.jsx');
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));

// User routes
app.use('/users', userRoutes);
app.use('/services', serviceRoutes);

app.use('/messages', messageRoutes);



// Start the server
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

