// This middleware checks for the presence of a JWT token in the Authorization header of incoming requests. 
// If a token is present, it verifies the token using the secret key defined in the environment variables. 
// If the token is valid, it attaches the decoded user information to the request object and allows the request to proceed. 
// If the token is missing or invalid, it responds with an appropriate error message and status code.
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido" });
    }
}

module.exports = authMiddleware;