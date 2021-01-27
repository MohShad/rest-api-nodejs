'use strict'

const authenticationService = require('./authService')
const log = require('../../libs/log');
const jwt = require('jsonwebtoken');
const passport = require('../../security/jwt-strategy');

module.exports.signup = async (req, resp) => {

    log.trace(req.originalUrl + " - " + JSON.stringify(req.body));

    try {
        const result = await authenticationService.createUser(req.body);

        if (result.success) {
            resp.status(200).json({
                success: true,
                message: 'User created with success.',
                data: result.user
            });
        } else {
            resp.status(401).json({
                success: false,
                status: result.message
            });
        }
    } catch (error) {
        console.log('error', error);
        resp.status(500).json({
            success: false,
            status: 'We were unable to process your request.'
        });
    }
}

module.exports.login = async function (req, res, next) {

    const userFound = await authenticationService.getUser(req.body.email, req.body.password);

    if (userFound == null) {
        return res.status(400).json(
            {
                success: false,
                message: "User doesn't exist."
            }
        );
    }

    passport.authenticate('local', { session: false }, (err, userFound, cb) => {
        if (err || !userFound) {
            return res.status(400).json({
                success: false,
                message: cb.message
            });
        }

        req.login(userFound, { session: false }, async (err) => {
            if (err) {
                res.send(err);
            }
            
            await authenticationService.updateLastAccess(userFound.id);

            return res.status(200).json(
                {
                    success: true,
                    name: userFound.name,
                    token: createJwt({ sub: userFound.id })
                }
            );
        });
    })(req, res);
};

const createJwt = (body) => {
    const token = jwt.sign(body, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

module.exports.logout = async (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) return next(err)
        res.sendStatus(200)
    })
};

module.exports.validToken = (req, resp) =>
    resp.send('You have access to a protected page');