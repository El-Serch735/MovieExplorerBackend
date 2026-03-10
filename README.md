# MovieExplorer Backend

A Node.js backend API for the MovieExplorer application, built with Express.js and MySQL.

## Features

- User authentication with JWT
- Password hashing with bcrypt
- CORS enabled for frontend integration
- MySQL database connection

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
   - Copy the `.env` file and update the values:
     ```
     PORT=3000  # Server port 
     DB_HOST=localhost
     DB_USER=your_mysql_user
     DB_PASSWORD=your_mysql_password
     DB_NAME=MovieExplorer
     JWT_SECRET=your_jwt_secret
     ```

4. Create the MySQL database:
   - Log in to MySQL and run:
     ```sql
     CREATE DATABASE MovieExplorer;
     ```

## Running the Application

1. Start the development server:
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