// this controller handles user registration and login, interacting with the user model and utilizing utilities for password hashing and token generation
const userModel = require('../models/userModel');
const hashPassword = require('../utils/hashPassword');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');

async function register(req, res) {

    try {

        const { name, email, password, role } = req.body;

        const existingUser = await userModel.findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const hashedPassword = await hashPassword(password);

        const userRole = role || 'user';

        const userId = await userModel.createUser(name, email, hashedPassword, userRole);

        res.status(201).json({
            message: "Usuario registrado",
            userId
        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
}

async function login(req, res) {

    try {

        const { email, password } = req.body;

        const user = await userModel.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const token = generateToken(user);

        res.json({
            message: "Login exitoso",
            token
        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
}

module.exports = {
    register,
    login
};