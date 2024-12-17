const express = require("express");
const cors = require("cors");
const path = require('path'); //for handling pictures save

const port = 8080;

// middleware
const app = express();
app.use(cors());



// uploads
console.log(path.join(__dirname, 'uploads'));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
