
const db = require('../config/db');

async function createReview(reviewData) {

    const {
        movie_id,
        user_id,
        rating,
        review
    } = reviewData;

    const query = `
        INSERT INTO reviews (movie_id, user_id, rating, review)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
        movie_id,
        user_id,
        rating,
        review
    ]);

    return result.insertId;
}

async function getReviewsByMovie(movieId) {

    const query = `
        SELECT 
            reviews.id,
            reviews.rating,
            reviews.review,
            reviews.created_at,
            users.email AS user
        FROM reviews
        JOIN users ON reviews.user_id = users.id
        WHERE reviews.movie_id = ?
        ORDER BY reviews.created_at DESC
    `;

    const [rows] = await db.query(query, [movieId]);

    return rows;
}

async function updateReview(id, reviewData) {

    const { rating, review } = reviewData;

    const query = `
        UPDATE reviews
        SET 
            rating = ?,
            review = ?
        WHERE id = ?
    `;

    const [result] = await db.query(query, [
        rating,
        review,
        id
    ]);

    return result.affectedRows;
}

async function deleteReview(id) {

    const query = `
        DELETE FROM reviews
        WHERE id = ?
    `;

    const [result] = await db.query(query, [id]);

    return result.affectedRows;
}

async function updateMovieRating(movieId) {

    const query = `
        SELECT 
            AVG(rating) AS average_rating,
            COUNT(*) AS rating_count
        FROM reviews
        WHERE movie_id = ?
    `;

    const [rows] = await db.query(query, [movieId]);

    const average = rows[0].average_rating || 0;
    const count = rows[0].rating_count || 0;

    const updateQuery = `
        UPDATE movies
        SET 
            average_rating = ?,
            rating_count = ?
        WHERE id = ?
    `;

    await db.query(updateQuery, [
        average,
        count,
        movieId
    ]);
}

module.exports = {
    createReview,
    getReviewsByMovie,
    updateReview,
    deleteReview,
    updateMovieRating
};