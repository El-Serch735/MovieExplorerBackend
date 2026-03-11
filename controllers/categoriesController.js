// This file contains the controller functions for handling category-related requests in the Movie Explorer backend application. 
// Each function corresponds to a specific CRUD operation for categories, such as retrieving all categories, getting a single category by ID, creating a new category, updating an existing category, and deleting a category. 
// The functions interact with the category model to perform database operations and send appropriate responses back to the client.
const categoryModel = require('../models/categoryModel');

async function getCategories(req, res) {
    try {
        const categories = await categoryModel.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getCategory(req, res) {
    try {
        const { id } = req.params;
        const category = await categoryModel.getCategoryById(id);

        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.json(category);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createCategory(req, res) {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Solo administradores pueden crear categorías" });
        }

        const { name } = req.body;

        const categoryId = await categoryModel.createCategory(name);

        res.status(201).json({
            message: "Categoría creada",
            id: categoryId
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateCategory(req, res) {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Solo administradores pueden actualizar categorías" });
        }

        const { id } = req.params;
        const { name } = req.body;

        const updated = await categoryModel.updateCategory(id, name);

        if (!updated) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.json({ message: "Categoría actualizada" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteCategory(req, res) {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Solo administradores pueden eliminar categorías" });
        }

        const { id } = req.params;

        const deleted = await categoryModel.deleteCategory(id);

        if (!deleted) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.json({ message: "Categoría eliminada" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};