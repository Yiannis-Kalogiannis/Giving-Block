const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
console.log(cloudinary.config());

// Upload image to Cloudinary
const uploadImage = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    console.log(result);
    return result.secure_url; // Return the Cloudinary URL
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error; // Propagate the error
  }
};

module.exports = uploadImage;
