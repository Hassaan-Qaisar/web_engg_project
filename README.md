# Ecommerce Website - MERN Stack

This project is an ecommerce website developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It serves as the end semester project for the Web Engineering course at [Your University Name].

## Overview

This ecommerce website is the culmination of our group's efforts to showcase our skills in web development using the MERN stack. It includes all the essential functionalities of an ecommerce platform, along with a dashboard for sellers to manage their products and orders.

## Features

- **User Authentication**: Users can register, log in, and securely authenticate themselves using JWT (JSON Web Tokens).
- **Product Listings**: Display of products with detailed descriptions, images, and pricing.
- **Product Search**: Users can search for products by name or category.
- **Shopping Cart**: Users can add products to their cart, view cart contents, and proceed to checkout.
- **Order Management**: Users can view their order history and track the status of their orders.
- **Seller Dashboard**: Sellers have access to a dashboard where they can add, edit, and delete their products, as well as manage orders.
- **Real-time Chat**: Implemented using Socket.IO for real-time chat between customers and sellers.
- **File Uploads**: Integration with Cloudinary for uploading product images.
- **Email Notifications**: Integration with Nodemailer for sending email notifications on order confirmation and shipment.
- **Password Encryption**: User passwords are securely hashed using bcrypt for enhanced security.

## Technologies Used

### Frontend

- **React.js**: Frontend user interface and components.
- **Redux Toolkit**: State management for complex frontend logic.
- **React Router**: Navigation and routing within the React application.
- **Axios**: HTTP client for making API requests.
- **React Toastify**: Displaying notifications to users.
- **Socket.IO Client**: Real-time communication with the server.

### Backend

- **Node.js**: Backend server environment.
- **Express.js**: Backend framework for building APIs.
- **MongoDB**: NoSQL database for storing product and user data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Nodemailer**: Sending email notifications to users.
- **Bcrypt**: Hashing user passwords for security.
- **JSON Web Token (JWT)**: Authentication mechanism for secure user sessions.
- **Cloudinary**: Cloud storage for uploading and managing product images.

## Architecture

The project follows the Model-View-Controller (MVC) architecture pattern, separating the application into three main components:

- **Model**: Defines the data structure and interacts with the database using Mongoose.
- **View**: Frontend user interface components built with React.js.
- **Controller**: Handles business logic and API endpoints using Express.js.

## Installation and Usage

1. Clone the repository:

```bash
git clone https://github.com/your-username/ecommerce-website.git
```

2. Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

3. Start the backend server:

```bash
npm run dev
```

4. Open another terminal window, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

5. Start the frontend development server:

```bash
npm start
```

6. Open your web browser and go to [http://localhost:3000](http://localhost:3000) to view the website.

## Contributing

Contributions to this project are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/new-feature`).
6. Create a new Pull Request.

