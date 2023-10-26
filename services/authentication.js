require('dotenv').config();
const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
        if (err) {
            console.error(err);
            return res.status(403).json({ message: 'Forbidden' });
        }
        res.locals = response;  // Set res.locals instead of overwriting it
        next();
    });
}

module.exports = { authenticateToken: authenticateToken };
