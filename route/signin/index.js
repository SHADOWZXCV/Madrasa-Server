const express = require('express');
const signInRouter = express.Router();
const { handleSignIn, 
        handleSignInMod,
        handleSignInSchool
    } = require('@Controller/authentication/signin');

signInRouter.post('/', handleSignIn);
// TODO: route for logout
signInRouter.get('/logout', (req, res, next) => {} );
// TODO: route for sms verification ( no sms, use verification code instead! )
signInRouter.post('/validate', (req, res, next) => {} );
signInRouter.post('/mod', handleSignInMod);
signInRouter.post('/school', handleSignInSchool);

module.exports = signInRouter;
