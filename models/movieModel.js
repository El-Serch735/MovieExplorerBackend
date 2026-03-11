// This file contains the model functions for interacting with the movies table in the database. 
// It includes functions to get all movies, get a movie by its ID, create a new movie, update an existing movie, and delete a movie. 
// Each function uses parameterized queries to prevent SQL injection attacks and returns the appropriate results based on the database operations performed.
const db = require('../config/db');

async function getAllMovies() {

    const query = `
        SELECT 
            movies.id,
            movies.title,
            movies.description,
            movies.image_url,
            movies.release_year,
            movies.average_rating,
            movies.rating_count,
            movies.created_at,
            categories.name AS category,
            users.email AS created_by
        FROM movies
        JOIN categories ON movies.category_id = categories.id
        JOIN users ON movies.created_by = users.id
        ORDER BY movies.created_at DESC
    `;

    const [rows] = await db.query(query);

    return rows;
}

async function getMovieById(id) {

    const query = `
        SELECT 
            movies.id,
            movies.title,
            movies.description,
            movies.image_url,
            movies.release_year,
            movies.average_rating,
            movies.rating_count,
            movies.created_at,
            categories.name AS category,
            users.email AS created_by
        FROM movies
        JOIN categories ON movies.category_id = categories.id
        JOIN users ON movies.created_by = users.id
        WHERE movies.id = ?
    `;

    const [rows] = await db.query(query, [id]);

    return rows[0];
}

async function createMovie(movieData) {

    const {
        title,
        description,
        image_url,
        release_year,
        category_id,
        created_by
    } = movieData;

    const query = `
        INSERT INTO movies
        (title, description, image_url, release_year, category_id, created_by)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
        title,
        description,
        image_url,
        release_year,
        category_id,
        created_by
    ]);

    return result.insertId;
}

async function updateMovie(id, movieData) {

    const {
        title,
        description,
        image_url,
        release_year,
        category_id
    } = movieData;

    const query = `
        UPDATE movies
        SET 
            title = ?,
            description = ?,
            image_url = ?,
            release_year = ?,
            category_id = ?
        WHERE id = ?
    `;

    const [result] = await db.query(query, [
        title,
        description,
        image_url,
        release_year,
        category_id,
        id
    ]);

    return result.affectedRows;
}

async function deleteMovie(id) {

    const query = `
        DELETE FROM movies
        WHERE id = ?
    `;

    const [result] = await db.query(query, [id]);

    return result.affectedRows;
}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};