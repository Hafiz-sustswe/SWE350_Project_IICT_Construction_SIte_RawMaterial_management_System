require('dotenv').config();
const jwt = require('jsonwebtoken'); // Add this line to import the jwt module

function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
   
    
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            console.error(err);
            return res.status(403).json({ message: 'Forbidden' });
        }
        
        // Set decoded user information in res.locals
        res.locals.user = decoded;
        //console.log("Decoded Token:", decoded);
        next();
    });
}

module.exports = { authenticateToken: authenticateToken };

