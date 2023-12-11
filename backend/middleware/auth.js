const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

// Middleware to check if the user is authenticated
exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    // Extract the token from cookies
    const { token } = req.cookies;

    // Check if the token is present
    if (!token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    // Verify the token and decode the user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Retrieve user information from the database and attach it to the request
    req.user = await User.findById(decoded.id);

    next();
});

// Middleware to check if the user is a seller
exports.isSeller = catchAsyncErrors(async (req, res, next) => {
    // Extract the seller token from cookies
    const { seller_token } = req.cookies;

    // Check if the seller token is present
    if (!seller_token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    // Verify the seller token and decode the seller information
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

    // Retrieve seller information from the database and attach it to the request
    req.seller = await Shop.findById(decoded.id);

    next();
});

// Middleware to check if the user has admin privileges
exports.isAdmin = (...roles) => {
    return (req, res, next) => {
        // Check if the user's role is included in the allowed roles
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`${req.user.role} can not access this resource!`));
        }

        // If the user's role is allowed, proceed to the next middleware
        next();
    };
};
