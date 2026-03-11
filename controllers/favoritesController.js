// This file contains the controller functions for handling favorite-related requests in the Movie Explorer backend application. 
// Each function corresponds to a specific CRUD operation for favorites, such as getting a user's favorite movies, adding a movie to favorites, and removing a movie from favorites. 
// The functions interact with the favorite model to perform database operations and send appropriate responses back to the client.
const favoriteModel = require('../models/favoriteModel');

exports.getFavorites = async (req, res) => {
    try {

        const userId = req.user.id;

        const favorites = await favoriteModel.getFavoritesByUser(userId);

        res.json(favorites);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error al obtener favoritos"
        });

    }
};

exports.addFavorite = async (req, res) => {
    try {

        const userId = req.user.id;
        const { movie_id } = req.body;

        if (!movie_id) {
            return res.status(400).json({
                message: "movie_id es obligatorio"
            });
        }

        await favoriteModel.addFavorite(userId, movie_id);

        res.status(201).json({
            message: "Película agregada a favoritos"
        });

    } catch (error) {

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                message: "Esta película ya está en favoritos"
            });
        }

        console.error(error);

        res.status(500).json({
            message: "Error al agregar favorito"
        });

    }
};

exports.removeFavorite = async (req, res) => {
    try {

        const userId = req.user.id;
        const { movieId } = req.params;

        const deleted = await favoriteModel.removeFavorite(userId, movieId);

        if (deleted === 0) {
            return res.status(404).json({
                message: "Favorito no encontrado"
            });
        }

        res.json({
            message: "Favorito eliminado"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error al eliminar favorito"
        });

    }
};