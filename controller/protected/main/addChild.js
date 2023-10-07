const logger = require('@Util/log');
const randtoken = require("rand-token");
const { addParentToMod } = require('@Models/mod');
const { makeNewParent } = require('@Models/user');

const handleAddChild = (req, res, next) => {
    if(!req.file)
        return res.status(400).end();
    const { child_name, parent_number, parent_number2, mod_no } = req.body;
    const { filename: childImage } = req.file;
    const randToken = randtoken.generate(6);

    return makeNewParent(parent_number, parent_number2, randToken, child_name, childImage).then((data) => {
        if(!data)
            return res.status(409).end();
        addParentToMod(parent_number, parent_number2, child_name, childImage, mod_no).then(newMod => {
            return res.status(200).send({
                phone: newMod.phone,
                parents: newMod.parents
            });
        }).catch(err => res.status(409).end());
    }).catch(err => res.status(409).end());

}

module.exports = {
    handleAddChild
}
