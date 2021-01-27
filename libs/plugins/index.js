const path = require('path')

module.exports.setup = () => {
    require("dotenv").config({
        path: path.join(__dirname, "./.env")
    });
}

const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');

module.exports.register = (appExpress, secretKey) => {
    registerPassport(appExpress);
    registerSession(appExpress, secretKey);
    registerParser(appExpress);
}

const registerPassport = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
}

const registerSession = (app, secretKey) => {
    app.use(session(
        {
            resave: false,
            saveUninitialized: true,
            secret: secretKey,
        }
    ))
}

const registerParser = (app) => {
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
}