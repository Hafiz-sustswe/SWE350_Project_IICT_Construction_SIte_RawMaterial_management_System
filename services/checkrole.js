// checkRole.js
require('dotenv').config();

function additionalCondition(res, expectedUserId) {
    const userId = res.locals.user.ex_id; // Get the user ID from the decoded token
    return userId === expectedUserId;
}

function checkRole(requiredRoles, checkType, additionalParam) {
    return function(req, res, next) {
        const userRole = res.locals.user.role_id; // Corrected role extraction
        const userId = res.locals.user.ex_id; // Get the user ID from the decoded token

        //  console.log('User Role:', userRole);
        //  console.log('User ID:', userId);

        if (checkType === 'role' && requiredRoles.includes(userRole)) {
            next(); // User has the required role, proceed to the next middleware
        } else if (checkType === 'userId' && additionalCondition(res, additionalParam)) {
            next(); // User ID satisfies additional conditions, proceed to the next middleware
        } else {
            res.status(401).json({ error: 'Unauthorized' }); // User does not have the required role or does not satisfy additional conditions
        }
    };
}

module.exports = { checkRole: checkRole };
