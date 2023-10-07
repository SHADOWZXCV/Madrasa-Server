const mongoose = require('mongoose');
const { USERSCHEMA } = require('./schemas');
const logger = require('@Util/log');

class DB {
    constructor(){
        this.userSchema = this._createInstance();
        this.userModel = this._createModel();
        this.makeNewParent = this.makeNewParent.bind(this);
    }

    _createInstance(){
        return mongoose.Schema(USERSCHEMA, { collection: 'parents' });
    }

    _createModel(){
        return mongoose.model('Parent', this.userSchema);
    }

    async makeNewParent(phone, altPhone, verificationCode, childName, childImage) {
        const child = { childName, childImage };
        const user = new this.userModel({
            phone,
            altPhone,
            verificationCode,
            children: [child]
        });

        return await user.save();
    }
}

module.exports = new DB();
