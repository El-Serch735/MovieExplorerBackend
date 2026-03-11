// This file defines the routes for category-related operations in the Movie Explorer backend application. 
// It uses Express to create a router and connects each route to the corresponding controller function in the categoriesController. 
// The routes include GET requests for retrieving all categories and a single category by ID, as well as POST, PUT, and DELETE requests for creating, updating, and deleting categories, respectively. 
// The POST, PUT, and DELETE routes are protected by an authentication middleware to ensure that only authorized users can perform these operations. Finally, the router is exported for use in the main application file.
const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categoriesController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', categoriesController.getCategories);

router.get('/:id', categoriesController.getCategory);

router.post('/', authMiddleware, categoriesController.createCategory);

router.put('/:id', authMiddleware, categoriesController.updateCategory);

router.delete('/:id', authMiddleware, categoriesController.deleteCategory);

module.exports = router;