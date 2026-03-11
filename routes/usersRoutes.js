// This file defines the routes for user registration and login, and connects them to the corresponding controller functions. 
// It uses Express to create a router, and imports the usersController to handle the logic for each route. 
// The /register route is a POST request that calls the register function in the usersController, while the /login route is also a POST request that calls the login function. 
// Finally, the router is exported for use in the main application file.
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.post('/register', usersController.register);
router.post('/login', usersController.login);

module.exports = router;