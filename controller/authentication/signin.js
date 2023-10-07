const logger = require('@Util/log');
const passport = require('passport');
const setSessionExpirationBySeconds = require('./session');

const handleSignInSchool = (req, res, next) => passport.authenticate('school-local',
(err, user) => {
    if (err) return next(err);
    if (!user) return res.sendStatus(401);

    req.logIn(user, function(err) {
        if (err) return next(err);

        const cookieTtl = setSessionExpirationBySeconds(req, process.env.sessionTTLSchool);
        logger.debug(`session expiry ttl: ${cookieTtl}`);

        return res.status(200).send({ isSchool: user.isSchool, ttl: cookieTtl });
    });
})(req,res,next);

// TODO: add verification to all inputs
const handleSignIn = (req, res, next) => passport.authenticate('local',
(err, user) => {
    if (err) return next(err);
    if (!user) return res.sendStatus(404);

    req.logIn(user, function(err) {
        if (err) return next(err);

        return res.status(200).send({ fname: user.fname });
    });
})(req,res,next);

const handleSignInMod = (req, res, next) => passport.authenticate('mod-local',
(err, user) => {
    if (err) return next(err);
    if (!user) return res.sendStatus(401);

    req.logIn(user, function(err) {
        if (err) return next(err);

        return res.status(200).send({ isMod: user.isMod });
    });
})(req,res,next);


module.exports = {
    handleSignIn,
    handleSignInMod,
    handleSignInSchool
};
