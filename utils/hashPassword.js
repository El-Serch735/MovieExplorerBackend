// this function takes a plain text password and returns a hashed version using bcrypt
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

module.exports = hashPassword;