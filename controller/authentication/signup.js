const passport = require('passport');
const { userModel } = require('@Models/user');
const { validateToken } = require("@Models/user");
const { hash } = require('@Util/password');
const logger = require('@Util/log');

const handleSignup = (req, res) => {
    const { body } = req;
//    const numberVerification = randtoken.generate(6, "0123456789");

    hash(body.password, (data, salt) => {
        const user = userModel({
            fname: body.fname,
            lname: body.lname,
            email: body.email,
            phone: body.phone,
            altPhone: body.altPhone,
            pw: data,
            salt,
            numberVerification
        });

        user.save()
        .then(doc => {
            res.status(200).send({ email: doc.email });
        })
        .catch(_err => res.status(405).send({ error: `This email exists already!` }));
    });
};

// TODO: change to number verification instead of email
const validateEmailUser = (req, res, next) => {
    const { body: { email, token }} = req;

    return validateToken(email, token, (isValidated) => {
        logger.debug(`isValidated: ${isValidated}`);
        if(!isValidated)
            return res.sendStatus(405);

        return next();
    });
};

// TODO: change to number verification instead of email
const signInNewUser = (req, res, next) => passport.authenticate('signup-local',
(err, user) => {
    if (err) return next(err);
    if (!user) return res.sendStatus(404);

    req.logIn(user, function(err) {
        if (err) return next(err);
        return res.status(200).send({ name: user.name });
  });
})(req,res,next);

module.exports = {
    handleSignup,
    validateEmailUser,
    signInNewUser
};
