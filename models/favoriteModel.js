// This file contains the model functions for handling favorite-related database operations in the Movie Explorer backend application. 
// It includes functions to get a user's favorite movies, add a movie to favorites, and remove a movie from favorites. 
// Each function uses parameterized queries to prevent SQL injection attacks and returns the appropriate results based on the database operations performed.
const db = require('../config/db');

async function getFavoritesByUser(userId) {

    const query = `
        SELECT 
            movies.id,
            movies.title,
            movies.image_url,
            movies.average_rating,
            movies.rating_count
        FROM favorites
        JOIN movies ON favorites.movie_id = movies.id
        WHERE favorites.user_id = ?
        ORDER BY favorites.created_at DESC
    `;

    const [rows] = await db.query(query, [userId]);

    return rows;
}

async function addFavorite(userId, movieId) {

    const query = `
        INSERT INTO favorites (user_id, movie_id)
        VALUES (?, ?)
    `;

    const [result] = await db.query(query, [userId, movieId]);

    return result;
}

async function removeFavorite(userId, movieId) {

    const query = `
        DELETE FROM favorites
        WHERE user_id = ? AND movie_id = ?
    `;

    const [result] = await db.query(query, [userId, movieId]);

    return result.affectedRows;
}

module.exports = {
    getFavoritesByUser,
    addFavorite,
    removeFavorite
};