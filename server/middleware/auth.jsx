require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../schemas/usersSchema.jsx");


// Verify the token
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    // Check if the Authorization header exists and has a valid Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      console.error("Authorization header is missing or invalid:", authHeader);
      return res.status(401).json({ message: "Unauthorized, Token not found" });
    }
  
    const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"
  
    if (!token) {
      console.error("Token format is invalid:", authHeader); // Log the invalid token format for debugging
      return res
        .status(401)
        .json({ message: "Unauthorized, Token format is invalid" });
    }
  
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      console.error("Secret key is not defined in environment variables.");
      return res.status(500).json({ message: "Server configuration error." });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, secretKey); // Decode the token using the secret key to extract the payload
  
      // Validate the decoded user ID
      if (!mongoose.Types.ObjectId.isValid(decoded.userId)) { // Check if the user ID is a valid MongoDB ObjectId
        console.error("Invalid User ID in Token:", decoded.userId); // Log the invalid user ID for debugging
        return res.status(400).json({ message: "Invalid user ID in token." }); 
      }
  
      // Fetch the user from the database
      const user = await User.findById(decoded.userId);
      if (!user) {
        console.error("User not found for ID:", decoded.userId);
        return res.status(404).json({ message: "User not found." });
      }
  
      // Attach the user to the request object for further middleware or the route handler to use
      req.user = { _id: user._id }; // Attach only the ID for simplicity and security reasons (to avoid leaking sensitive user information) 
      next();
    } catch (error) {
      // Handle token verification errors
      console.error(`JWT Error: ${error.name} - ${error.message}`); // Log the error for debugging purposes 
      res
        .status(401)
        .json({ message: "Unauthorized, token is invalid or expired." }); // Send a generic error message to the client
    }
  };
  
  module.exports = verifyToken;