// This file contains functions to interact with the categories table in the database. 
// It includes functions to get all categories, get a category by its ID, create a new category, update an existing category, and delete a category. 
// Each function uses parameterized queries to prevent SQL injection attacks and returns the appropriate results based on the database operations performed.
const db = require('../config/db');

async function getAllCategories() {
    const query = "SELECT * FROM categories";
    const [rows] = await db.query(query);
    return rows;
}

async function getCategoryById(id) {
    const query = "SELECT * FROM categories WHERE id = ?";
    const [rows] = await db.query(query, [id]);
    return rows[0];
}

async function createCategory(name) {
    const query = "INSERT INTO categories (name) VALUES (?)";
    const [result] = await db.query(query, [name]);
    return result.insertId;
}

async function updateCategory(id, name) {
    const query = "UPDATE categories SET name = ? WHERE id = ?";
    const [result] = await db.query(query, [name, id]);
    return result.affectedRows;
}

async function deleteCategory(id) {
    const query = "DELETE FROM categories WHERE id = ?";
    const [result] = await db.query(query, [id]);
    return result.affectedRows;
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};