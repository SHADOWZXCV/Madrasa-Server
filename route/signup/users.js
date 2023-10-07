const express = require('express');
const signupRouter = express.Router();
const {
    handleSignup,
} = require('@Controller/authentication/signup');

signupRouter.post('/', handleSignup);
// TODO: change to number verification instead
signupRouter.post('/validate', (req, res, next) => {} );
// TODO: route for saving location data
signupRouter.post('/location', (req, res, next) => {} );
// TODO: add another page for saving child data
signupRouter.post('/children-info', (req, res, next) => {} );

module.exports = signupRouter;
