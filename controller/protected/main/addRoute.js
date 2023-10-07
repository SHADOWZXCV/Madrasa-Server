const logger = require('@Util/log');
const randtoken = require("rand-token");
const { createNewModerator } = require('@Models/mod');
const { addModToSchool } = require('@Models/school');

const handleAddRoute = (req, res, next) => {
    const { body: { modName, busno, phone } } = req;
    const { user: { schoolName, email } } = req;
    const randToken = randtoken.generate(6);

    // add mod with no token
    createNewModerator({ modName, busno, phone }, randToken, schoolName).then(data => {
        if(!data)
            return res.status(409).send({ error: 'This moderator already exists' });

        // add mod to school
        addModToSchool(data, email).then(name => {
            if(!name)
                return res.status(409).send({ error: 'This moderator already exists' }).end();

            return next();
        });
    }).catch(err => {
        logger.error(err);
        res.status(409).send({ error: 'This moderator already exists' }).end();
    });

}

module.exports = {
    handleAddRoute
}
