'use strict'

const authenticationController = require('./authController')
const express = require('express');
const router = express.Router();
const authorize = require('../../security/authorize');
const validator = require('../../libs/joi');
const schema = require('./authSchemas');

router.post("/signup", validator.body(schema.createUserRequest), authenticationController.signup);
router.post("/login", validator.body(schema.loginRequest), authenticationController.login);
router.get("/logout", authenticationController.logout);
router.get("/validToken", authorize(), authenticationController.validToken);

module.exports = router;