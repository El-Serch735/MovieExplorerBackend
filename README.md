# MovieExplorer Backend

A Node.js/Express.js backend API for the MovieExplorer application with MySQL database integration. Provides complete CRUD operations for movies, categories, and user reviews with JWT authentication and role-based access control.

## Features

- **User Authentication**: JWT-based login and registration with secure password hashing (bcrypt)
- **Role-Based Access Control**: Admin and user roles with restricted endpoints
- **Movie Management**: Complete CRUD operations for movies with average ratings
- **Categories**: Category management for organizing movies
- **User Reviews**: Review and rating system for movies with automatic rating aggregation
- **CORS Enabled**: Ready for frontend integration
- **MySQL Database**: Persistent data storage with parameterized queries for security
- **Error Handling**: Comprehensive error responses and validation

## Prerequisites

- Node.js (v14 or higher)
- MySQL server running locally
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd MovieExplorerBackend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create or update the `.env` file with these values:
     ```
     PORT=3000
     DB_HOST=localhost
     DB_USER=your_mysql_user
     DB_PASSWORD=your_mysql_password
     DB_NAME=MovieExplorer
     JWT_SECRET=your_jwt_secret_key
     ```

4. Create the MySQL database:
   ```sql
   CREATE DATABASE MovieExplorer;
   ```

## Running the Application

**Development** (with auto-reload):
```bash
npm run dev
```

**Production**:
```bash
npm start
```

The server runs on `http://localhost:3000` by default.

## Testing Database Connection

```bash
node testConnections.js
```

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }
  ```
- `POST /api/users/login` - Login and get JWT token
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Categories (Authenticated)
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (admin only)
  ```json
  {
    "name": "Action"
  }
  ```
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Movies (Authenticated)
- `GET /api/movies` - Get all movies with ratings and category info
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Create movie (admin only)
  ```json
  {
    "title": "Movie Title",
    "description": "Description",
    "image_url": "https://...",
    "release_year": 2024,
    "category_id": 1
  }
  ```
- `PUT /api/movies/:id` - Update movie (admin only)
- `DELETE /api/movies/:id` - Delete movie (admin only)

### Reviews (Authenticated)
- `GET /api/reviews/movie/:movieId` - Get all reviews for a movie
- `POST /api/reviews` - Create review
  ```json
  {
    "movie_id": 1,
    "rating": 5,
    "review": "Great movie!"
  }
  ```
- `PUT /api/reviews/:id` - Update review
  ```json
  {
    "rating": 4,
    "review": "Updated review",
    "movie_id": 1
  }
  ```
- `DELETE /api/reviews/:id` - Delete review
  ```json
  {
    "movie_id": 1
  }
  ```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

Get a token by logging in via `/api/users/login`.

## Project Structure

```
MovieExplorerBackend/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   ├── usersController.js      # User auth logic
│   ├── categoriesController.js # Category operations
│   ├── moviesController.js     # Movie operations
│   └── reviewsController.js    # Review operations
├── models/
│   ├── userModel.js       # User database functions
│   ├── categoryModel.js   # Category database functions
│   ├── movieModel.js      # Movie database functions
│   └── reviewModel.js     # Review database functions
├── routes/
│   ├── usersRoutes.js     # User endpoints
│   ├── categoriesRoutes.js # Category endpoints
│   ├── moviesRoutes.js    # Movie endpoints
│   └── reviewsRoutes.js   # Review endpoints
├── middleware/
│   └── authMiddleware.js  # JWT verification middleware
├── utils/
│   ├── generateToken.js   # JWT token generation
│   └── hashPassword.js    # Password hashing utilities
├── server.js              # Main application entry point
├── testConnections.js     # Database connection test
├── package.json
└── README.md
```

## Dependencies

- **express**: Web framework
- **mysql2**: MySQL database driver
- **jsonwebtoken**: JWT authentication
- **bcrypt**: Password hashing
- **cors**: Cross-Origin Resource Sharing
- **dotenv**: Environment variable management

## Status

✅ Backend development complete with all core features implemented and tested.

- **express**: Web framework
- **mysql2**: MySQL client
- **jsonwebtoken**: JWT authentication
- **bcrypt**: Password hashing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables

## Development Dependencies

- **nodemon**: Auto-restart for development

## API Endpoints

- `GET /`: Health check endpoint

## Troubleshooting

- Ensure MySQL is running and credentials are correct.
- Check that the database `MovieExplorer` exists.
- Verify `.env` file is properly configured and not committed to git (it's in `.gitignore`).
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:3000`.

2. For production:
   ```bash
   npm start
   ```

## Testing Database Connection

Run the database connection test:
```bash
node testconnections.js
```

## Project Structure

- `server.js`: Main application entry point
- `config/db.js`: Database configuration
- `controllers/`: API controllers
- `models/`: Database models
- `routes/`: API routes
- `middleware/`: Custom middleware
- `utils/`: Utility functions
- `testconnections.js`: Database connection test script

## Dependencies

- **express**: Web framework
- **mysql2**: MySQL client
- **jsonwebtoken**: JWT authentication
- **bcrypt**: Password hashing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables

## Development Dependencies

- **nodemon**: Auto-restart for development

## API Endpoints

- `GET /`: Health check endpoint

## Troubleshooting

- Ensure MySQL is running and credentials are correct.
- Check that the database `MovieExplorer` exists.
- Verify `.env` file is properly configured and not committed to git (it's in `.gitignore`).