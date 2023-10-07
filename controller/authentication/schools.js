const logger = require('@Util/log');
const { hash } = require('@Util/password');
const { validateTokenAndSetNewSchool, validateTokenCheck } = require("@Models/school");
const setSessionExpirationBySeconds = require('./session');

const validateEmail = (req, res) => {
    const { body: { email, token, password, name, schoolName }} = req;

    if(req.path === '/checkIfValid') {
        return validateTokenCheck(email, token, (isValidated) => {
            logger.debug(`isValidated: ${isValidated}`);
    
            if(!isValidated)
                return res.sendStatus(405);
    
            return res.sendStatus(200);
        });        
    } else if (req.path === '/validate') {
        hash(password, (data, salt) => {
            return validateTokenAndSetNewSchool({
                email,
                pw: data,
                name,
                salt,
                schoolName
            }, token, (user) => {
                logger.debug(`validated user: ${user}`);

                if(!user)
                    return res.sendStatus(405);

                return res.status(200).send({ isSchool: user.isSchool });
            });
        });
    }
};

module.exports = {
    validateEmail
};