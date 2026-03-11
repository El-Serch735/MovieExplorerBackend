
const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', moviesController.getMovies);
router.get('/:id', moviesController.getMovie);
router.post('/', authMiddleware, moviesController.createMovie);
router.put('/:id', authMiddleware, moviesController.updateMovie);
router.delete('/:id', authMiddleware, moviesController.deleteMovie);

module.exports = router;