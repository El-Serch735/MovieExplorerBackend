
const movieModel = require('../models/movieModel');

exports.getMovies = async (req, res) => {
    try {

        const movies = await movieModel.getAllMovies();

        res.json(movies);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error al obtener las películas"
        });

    }
};

exports.getMovie = async (req, res) => {
    try {

        const { id } = req.params;

        const movie = await movieModel.getMovieById(id);

        if (!movie) {
            return res.status(404).json({
                message: "Película no encontrada"
            });
        }

        res.json(movie);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error al obtener la película"
        });

    }
};

exports.createMovie = async (req, res) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "No tienes permiso para crear películas"
            });
        }

        const {
            title,
            description,
            image_url,
            release_year,
            category_id
        } = req.body;

        if (!title || !category_id) {
            return res.status(400).json({
                message: "Título y categoría son obligatorios"
            });
        }

        const newMovie = {
            title,
            description,
            image_url,
            release_year,
            category_id,
            created_by: req.user.id
        };

        const movieId = await movieModel.createMovie(newMovie);

        res.status(201).json({
            message: "Película creada correctamente",
            movieId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error al crear la película"
        });

    }
};

exports.updateMovie = async (req, res) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "No tienes permiso para editar películas"
            });
        }

        const { id } = req.params;

        const updatedRows = await movieModel.updateMovie(id, req.body);

        if (updatedRows === 0) {
            return res.status(404).json({
                message: "Película no encontrada"
            });
        }

        res.json({
            message: "Película actualizada correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error al actualizar la película"
        });

    }
};

exports.deleteMovie = async (req, res) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "No tienes permiso para eliminar películas"
            });
        }

        const { id } = req.params;

        const deletedRows = await movieModel.deleteMovie(id);

        if (deletedRows === 0) {
            return res.status(404).json({
                message: "Película no encontrada"
            });
        }

        res.json({
            message: "Película eliminada correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error al eliminar la película"
        });

    }
};