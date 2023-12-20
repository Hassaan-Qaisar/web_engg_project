// Import required modules
const app = require("./app");  // Assuming "app" is the main application module
const connectDatabase = require("./db/Database");  // Assuming this module handles database connection
const cloudinary = require("cloudinary");  // Importing the Cloudinary module for image management

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server for handling uncaught exception");
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",  // Loading environment variables from a specific path
  });
}

// Connect to the database
connectDatabase();

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}`
  );
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log("Shutting down the server for unhandled promise rejection");

  // Close the server gracefully before exiting
  server.close(() => {
    process.exit(1);
  });
});