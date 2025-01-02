require("dotenv").config();
const jwt = require('jsonwebtoken');

// User info for testing
const user = {
  "firstName": "John",
  "lastName": "Doe",
  "username": "yiannis",
  "profilePicture": "https://res.cloudinary.com/dj02fukkg/image/upload/v1735410363/Giving%20block/gatvvwyzwdsqfjlpm4wg.png",

};

const secretKey = process.env.SECRET_KEY;

// Debug log to verify secret key loading
console.log("Loaded SECRET_KEY:", secretKey);

// Check if secretKey is undefined
if (!secretKey) {
  console.error("SECRET_KEY is not defined in the .env file!");
  process.exit(1); // Exit if secretKey is not defined
}

// Generate the token
const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

console.log('Generated JWT Token:', token);
