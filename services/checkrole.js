require('dotenv').config();

function checkRole(requiredRoles) {
    return function(req, res, next) {
        const userRole = parseInt(res.locals.role_id, 10); // Assuming role_id is a number

        if (requiredRoles.includes(userRole)) {
            next(); // User has one of the required roles, proceed to the next middleware
        } else {
            res.status(401).json({ error: 'Unauthorized' }); // User does not have any of the required roles
        }
    };
}

module.exports = { checkRole: checkRole };
