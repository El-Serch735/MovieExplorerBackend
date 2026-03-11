// This file contains functions to interact with the users table in the database. 
// It includes functions to create a new user and to find a user by their email address. 
// The createUser function takes a name, email, and password, and inserts a new record into the users table. 
// The findUserByEmail function takes an email address and retrieves the corresponding user record from the database. 
// Both functions use parameterized queries to prevent SQL injection attacks.
const db = require('../config/db');

async function createUser(name, email, password, role) {

    const query = `
        INSERT INTO users (name, email, password, role)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [name, email, password, role]);

    return result.insertId;
}

async function findUserByEmail(email) {

    const query = `
        SELECT * FROM users WHERE email = ?
    `;

    const [rows] = await db.query(query, [email]);

    return rows[0];
}

module.exports = {
    createUser,
    findUserByEmail
};