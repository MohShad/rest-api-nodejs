const expressJwt = require('express-jwt');
const { secret } = { "secret": process.env.JWT_SECRET }

module.exports = authorize;

function authorize(roles = []) {

    return [
        expressJwt({ secret }),

        (err, req, res, next) => {
            if (!err.message === "jwt expired") {
                return res.status(401).json({ successo: false, message: 'Unauthorized' });
                next();
            } else {
                return res.status(401).json({ successo: false, message: err.message });
            }
        }
    ];
}