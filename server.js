require('dotenv').config();
const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/usersRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const moviesRoutes = require('./routes/moviesRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/favorites', favoritesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});