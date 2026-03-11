// This file defines the routes for handling favorite movies in the Movie Explorer backend application. 
// It uses Express to create a router and defines routes for getting a user's favorite movies, adding a movie to favorites, and removing a movie from favorites. 
// Each route is associated with the corresponding controller function from the favoritesController and includes authentication middleware to ensure that only authenticated users can perform these actions.
const express = require('express');
const router = express.Router();

const favoritesController = require('../controllers/favoritesController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, favoritesController.getFavorites);

router.post('/', authMiddleware, favoritesController.addFavorite);

router.delete('/:movieId', authMiddleware, favoritesController.removeFavorite);

module.exports = router;