# Teckno Technical CRUD App Server
Teckno Technical CRUD App is a Node.js application that provides a basic CRUD API (Login , Register , User List Display) for managing user data in a MySQL database. The API includes user authentication using JSON Web Tokens (JWT) and password hashing using bcrypt. It utilizes the Sequelize ORM for defining and interacting with the database schema.

# Project Structure
teckno-server
|-- config
|   -- config.js
|   -- sequelize.js
|-- middleware
|   -- user_authenticate.js
|-- models
|   -- user.js
|-- node_modules
|-- package.json
|-- package-lock.json
|-- server.js

# Directories and Files
config: Contains configuration files for the project.

config.js: Configuration file for MySQL database connection.
sequelize.js: Sequelize configuration for defining database models and associations.
middleware: Custom middleware for user authentication using JWT.

user_authenticate.js: Middleware to authenticate user requests using JWT tokens.
models: Database schema models defined using Sequelize.

user.js: User model defining the structure of the User table in the database.
node_modules: Node.js modules installed via npm.

package.json: Project dependencies and scripts configuration file.

package-lock.json: Lock file for package dependencies.

server.js: The main entry point for the Node.js application, where the server is initialized and API routes are defined.

# Installation
Before running the project, make sure you have the following prerequisites installed on your machine:

MySQL server
Node.js

# Follow these steps to set up and run the project:
cd teckno-server
=>npm install

# In the config/config.js file, configure your MySQL database connection details:
module.exports = {
  development: {
    database: 'compnay', // Change to your desired database name
    username: 'vikky',   // Change to your MySQL username
    password: 'vikky1993', // Change to your MySQL password
    // ...
  },
  // ...
};

Create the MySQL database by running the following command in your MySQL terminal:
CREATE DATABASE compnay;

# Start the Node.js server:
==>npm start
The server will run on port 3000 by default. You can modify the port in the server.js file if needed.

# API Endpoints
Login (POST): /auth

Authenticates users and returns a JWT token.
Registration (POST): /register

Registers a new user by creating a user record in the database.
User Details List (GET): /get-details

Retrieves a list of user details from the database.
