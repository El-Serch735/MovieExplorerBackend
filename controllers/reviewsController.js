// This file contains the controller functions for handling review-related requests in the Movie Explorer backend application. 
// Each function corresponds to a specific CRUD operation for reviews, such as creating a new review, getting reviews for a specific movie, updating an existing review, and deleting a review. 
// The functions interact with the review model to perform database operations and send appropriate responses back to the client.
const reviewModel = require('../models/reviewModel');

exports.createReview = async (req, res) => {
    try {

        const { movie_id, rating, review } = req.body;
        const user_id = req.user.id;

        if (!movie_id || !rating) {
            return res.status(400).json({
                message: "movie_id y rating son obligatorios"
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "El rating debe estar entre 1 y 5"
            });
        }

        const reviewData = {
            movie_id,
            user_id,
            rating,
            review
        };

        const reviewId = await reviewModel.createReview(reviewData);

        await reviewModel.updateMovieRating(movie_id);

        res.status(201).json({
            message: "Reseña creada correctamente",
            reviewId
        });

    } catch (error) {

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                message: "Ya calificaste esta película"
            });
        }

        console.error(error);

        res.status(500).json({
            message: "Error al crear la reseña"
        });

    }
};

exports.getReviewsByMovie = async (req, res) => {
    try {

        const { movieId } = req.params;

        const reviews = await reviewModel.getReviewsByMovie(movieId);

        res.json(reviews);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error al obtener las reseñas"
        });

    }
};

exports.updateReview = async (req, res) => {
    try {

        const { id } = req.params;
        const { rating, review, movie_id } = req.body;

        if (!rating || !movie_id) {
            return res.status(400).json({
                message: "rating y movie_id son obligatorios"
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "El rating debe estar entre 1 y 5"
            });
        }

        const updatedRows = await reviewModel.updateReview(id, {
            rating,
            review
        });

        if (updatedRows === 0) {
            return res.status(404).json({
                message: "Reseña no encontrada"
            });
        }

        await reviewModel.updateMovieRating(movie_id);

        res.json({
            message: "Reseña actualizada correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error al actualizar la reseña"
        });

    }
};

exports.deleteReview = async (req, res) => {
    try {

        const { id } = req.params;
        const { movie_id } = req.body;

        const deletedRows = await reviewModel.deleteReview(id);

        if (deletedRows === 0) {
            return res.status(404).json({
                message: "Reseña no encontrada"
            });
        }

        await reviewModel.updateMovieRating(movie_id);

        res.json({
            message: "Reseña eliminada correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error al eliminar la reseña"
        });

    }
};