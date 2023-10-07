const mongoose = require('mongoose');
const logger = require('@Util/log');
const { SCHOOLSCHEMA } = require('./schemas');

class SchoolModel {
    constructor(){
        this.schoolSchema = this._createInstance();
        this.schoolModel = this._createModel();
        this.validateTokenAndSetNewSchool = this.validateTokenAndSetNewSchool.bind(this);
        this.validateTokenCheck = this.validateTokenCheck.bind(this);
        this.addModToSchool = this.addModToSchool.bind(this);
        this.getAllMods = this.getAllMods.bind(this);
    }

    _createInstance(){
        return mongoose.Schema(SCHOOLSCHEMA, { collection: 'schools' });
    }

    _createModel(){
        return mongoose.model('School', this.schoolSchema);
    }

    validateTokenAndSetNewSchool(schoolObj, token, cb){
        const { email, pw, salt, name, schoolName } = schoolObj;

        this.schoolModel.findOneAndUpdate({ email, emailVerification: token }, {
                name,
                isSchool: true,
                emailVerification: '',
                pw,
                salt,
                schoolName,
                mods: []
            }
            , async (err, user) => {
            if(err)
                return logger.error(err)
            if(!user)
                return cb(false);

                return cb(user);
        })
    }

    validateTokenCheck(email, token, cb){
        this.schoolModel.findOne({ email, emailVerification: token }, async (err, user) => {
            if(err)
                return logger.error(err)
            if(!user)
                return cb(false);

            return cb(true);
        })
    }

    async getAllMods(schoolName) {
        try {
            if(!schoolName)
                return false;
    
            const { mods } = await this.schoolModel.findOne({ schoolName }, {
                'mods.moderatorName': 1,
                'mods.moderatorNumber': 1,
                'mods.isVerifiedModerator': 1,
                'mods.busNo': 1
            });

            if(!mods)
                return false;

            return mods;
        }
        catch(err) {
            logger.error(err);

            return false;
        }

    }

    async addModToSchool(mod, schoolEmail) {
        try {
            const { name, phone, busNo } = mod;
            const newMod = {
                moderatorName: name,
                moderatorNumber: phone,
                busNo,
                isVerifiedModerator: false
            };

            const school = await this.schoolModel.findOneAndUpdate({ email: schoolEmail }, {
                $push: { "mods": newMod }
            });

            return name;
        } catch (err) {
            logger.error(err);
            
            return false;
        }
    }
}

module.exports = new SchoolModel();
