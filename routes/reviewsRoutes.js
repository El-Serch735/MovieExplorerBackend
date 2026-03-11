// This file defines the routes for handling review-related requests in the Movie Explorer backend application. 
// It uses Express to create a router and defines routes for creating a new review, getting reviews for a specific movie, updating an existing review, and deleting a review. 
// Each route is associated with the corresponding controller function from the reviewsController and includes authentication middleware to ensure that only authenticated users can perform certain actions.
const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/reviewsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/movie/:movieId', reviewsController.getReviewsByMovie);

router.post('/', authMiddleware, reviewsController.createReview);

router.put('/:id', authMiddleware, reviewsController.updateReview);

router.delete('/:id', authMiddleware, reviewsController.deleteReview);

module.exports = router;