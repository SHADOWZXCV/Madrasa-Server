const express = require('express');
const signupRouterSchools = express.Router();
const {
    validateEmail
} = require('@Controller/authentication/schools');

signupRouterSchools.post('/validate', validateEmail );
signupRouterSchools.post('/checkIfvalid', validateEmail );

module.exports = signupRouterSchools;
