// resizeImage.js
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const resizeImage = (req, res, next) => {
  if (req.file) {
    const originalFilePath = path.join(__dirname, '../uploads', req.file.filename);
    const resizedFilePath = path.join(__dirname, '../uploads', 'resized-' + req.file.filename);

    // Resize image using Sharp
    sharp(originalFilePath)
      .resize(800) // Resize to width of 800px (adjust as needed)
      .jpeg({ quality: 80 }) // Adjust JPEG quality (optional)
      .toFile(resizedFilePath, async (err, info) => {
        if (err) {
          console.error("Error resizing image:", err);
          return next(err); // Pass error to next middleware
        }

        console.log("Resized image info:", info); // Log to verify resizing information

        // Replace the original file path with the resized file path
        req.file.path = resizedFilePath;

        try {
          // Wait a bit to ensure Sharp has finished processing
          await delay(500); // Wait for 500ms

          // Check if the original file exists, then delete it
          const fileExists = await fs.promises.access(originalFilePath).then(() => true).catch(() => false);
          
          if (fileExists) {
            // Now delete the original image after resizing is done
            await fs.promises.unlink(originalFilePath);
            console.log("Original image deleted:", originalFilePath);
          } else {
            console.log("Original file does not exist:", originalFilePath);
          }
        } catch (deleteError) {
          console.error("Failed to delete original file:", deleteError);
        }

        // Proceed to next middleware
        next();
      });
  } else {
    console.log("No file uploaded, skipping resize.");
    next();
  }
};

// Utility function for delay (in ms)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = resizeImage;
