const knex = require('../db-knex/knex-connection');
const bcrypt = require('bcrypt');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
},
	async function (email, password, cb) {
		return await knex('users').where('email', email).first()
			.then(user => {
				if (!user) return cb(null, false, { message: 'Wrong email.' });
				if (!comparePass(password, user.password)) {
					return cb(null, false, { message: 'Wrong password.' });
				} else {
					return cb(null, user);
				}
			})
			.catch(
				err => cb(err)
			);
	}
));

passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET
},
	async function (jwtPayload, cb) {
		return await knex('users').where('id', jwtPayload.id).first()
			.then(user => {
				return cb(null, user);
			})
			.catch(err => {
				return cb(err);
			});
	}
));

comparePass = (userPassword, databasePassword) => {
    return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = passport;