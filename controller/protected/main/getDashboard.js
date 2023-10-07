const { getAllMods } = require('@Models/school');
const { getModParents } = require('@Models/mod');
const logger = require('@Util/log');


const getModTableData = (req, res, next) => {
    const { modno } = req.params;
    console.log(modno);

    getModParents(modno).then(mod => {
        if(!mod)
            return res.sendStatus(404);

        return res.status(200).send({
            phone: mod.phone,
            parents: mod.parents
        });
    });
}

const getDashboardData = (req, res, next) => {
    /**
     * THE PLAN:
     * 1. Get routes data: all mods from the same school
     * 2. all parents who have the same mod, mod should have array of parents populated by parents data from parents collection
     */
    /**
     * {
     *   modName,
     *  modNumber,
     * isVerified,
     *  busNo
     * }
     */
    
    getAllMods(req.user.schoolName).then(mods => {
        if(!mods)
            return res.status(200).send({ 
                name: req.user.name,
                schoolName: req.user.schoolName
            });

        return res.status(200).send({ 
            name: req.user.name,
            schoolName: req.user.schoolName,
            mods 
        });
    });

}

module.exports = {
    getDashboardData,
    getModTableData
}
