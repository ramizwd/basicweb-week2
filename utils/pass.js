'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { getUserLogin } = require('../models/userModel');

// local strategy for username password login
passport.use(
	new Strategy(async (username, password, done) => {
		const params = [username];
		try {
			const [user] = await getUserLogin(params);
			console.log('Local strategy', user); // result is binary row
			if (user === undefined) {
				return done(null, false, {
					message: 'Incorrect email/password.',
				});
			}
			if (user.password !== password) {
				return done(null, false, {
					message: 'Incorrect email/password.',
				});
			}
			delete user.password;
			return done(
				null,
				{ ...user },
				{ message: 'Logged In Successfully' }
			); // use spread syntax to create shallow copy to get rid of binary row type
		} catch (err) {
			return done(err);
		}
	})
);

// TODO: JWT strategy for handling bearer token
// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET
passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
		},
		(jwtPayLoad, done) => {
			console.log('jwtpayload', jwtPayLoad);
			return done(null, jwtPayLoad);
		}
	)
);

module.exports = passport;
