const validator = require('validator');
const childrenSchema = {
    childName: {
        type: String
    },
    childImage: {
        type: String
    }
};

const parentsSchema = {
    phone: {
        type: String,
        unique: true
    },
    altPhone: {
        type: String
    },
    children: {
        type: [childrenSchema]
    },
};


const USERSCHEMA = {
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    email: {
        type: String
    },
    children: {
        type: [childrenSchema],
        required: true
    },
    pw: {
        type: String
    },
    salt: {
        type: String
    },
    // Number verification here is for sms 2-step auth
    verificationCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    altPhone: {
        type: String
    }
};

const MODSCHEMA = {
    name: {
        type: String,
        required: true
    },
    pw: {
        type: String,
    },
    salt: {
        type: String,
    },
    verificationCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    schoolName: {
        type: String,
        required: true
    },
    busNo: {
        type: Number,
        required: true,
        unique: true
    },
    parents: {
        type: [parentsSchema]
    }
};

const ModInSchool = {
    moderatorName: {
        type: String,
        required: true
    },
    moderatorNumber: {
        type: String,
        unique: true
    },
    isVerifiedModerator: {
        type: Boolean
    },
    busNo: {
        type: Number,
        required: true
    },
};

const SCHOOLSCHEMA = {
    name: {
        type: String,
    },
    schoolName: {
        type: String,
    },
    pw: {
        type: String,
    },
    salt: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        validate: value => validator.isEmail(value)
    },
    emailVerification: {
        type: String,
        required: true
    },
    isSchool: {
        type: Boolean
    },
    mods: {
        type: [ModInSchool]
    }
};

module.exports = {
    USERSCHEMA,
    MODSCHEMA,
    SCHOOLSCHEMA
};
