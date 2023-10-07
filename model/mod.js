const mongoose = require('mongoose');
const logger = require('@Util/log');
const { MODSCHEMA } = require('./schemas');

class ModModel {
    constructor(){
        this.modSchema = this._createInstance();
        this.modModel = this._createModel();
        this.createNewModerator = this.createNewModerator.bind(this);
        this.addParentToMod = this.addParentToMod.bind(this);
        this.getModParents = this.getModParents.bind(this);
    }

    _createInstance(){
        return mongoose.Schema(MODSCHEMA, { collection: 'mods' });
    }

    _createModel(){
        return mongoose.model('Mod', this.modSchema);
    }

    async createNewModerator(modObj, randToken, schoolName) {
            const { modName, busno, phone } = modObj;

            const mod = new this.modModel({
                name: modName,
                phone,
                busNo: Number(busno),
                verificationCode: randToken,
                schoolName 
            });
    
            return await mod.save();
    }

    async addParentToMod(phone, altPhone, childName, childImage, modNo) {
        const newParent = {
            phone,
            altPhone,
            children: {
                childName,
                childImage
            }
        };

        return await this.modModel.findOneAndUpdate({ phone: modNo }, {
            $push: { "parents": newParent }
        });

    }

    async getModParents(phone) {
        return await this.modModel.findOne({ phone });
    }

    // validateTokenAndSetNewSchool(schoolObj, token, cb){
    //     const { email, pw, salt, name, schoolName } = schoolObj;

    //     this.schoolModel.findOneAndUpdate({ email, emailVerification: token }, {
    //             name,
    //             isSchool: true,
    //             emailVerification: '',
    //             pw,
    //             salt,
    //             schoolName
    //         }
    //         , async (err, user) => {
    //         if(err)
    //             return logger.error(err)
    //         if(!user)
    //             return cb(false);

    //             return cb(user);
    //     })
    // }

    // validateTokenCheck(email, token, cb){
    //     this.schoolModel.findOne({ email, emailVerification: token }, async (err, user) => {
    //         if(err)
    //             return logger.error(err)
    //         if(!user)
    //             return cb(false);

    //         return cb(true);
    //     })
    // }
}

module.exports = new ModModel();
