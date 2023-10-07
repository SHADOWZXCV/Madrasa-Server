const LocalStrategy = require('passport-local');
const { schoolModel } = require('@Models/school');
const { userModel } = require('@Models/user');
const { verify } = require('@Util/password');

const strategy = new LocalStrategy({ usernameField: 'phone' },
    (username, password, done) => {
      userModel.findOne({ phone: username }, (err, user) => {
        if(err){
            return done(err);
        } if(user){
            return verify(password, user.pw, doesMatch => {
                return doesMatch ? done(null, user) : done(null, false);
            });
        } else {
            return done(null, false);
        }
    });
  }
);

const modStrategy = new LocalStrategy({ usernameField: 'phone' },
  (username, password, done) => {
    schoolModel.findOne({ phone: username }, (err, user) => {
        if(err){
            return done(err);
        } if(user){
            return verify(password, user.pw, doesMatch => {
                return (doesMatch && user.isMod) ? done(null, user) : done(null, false);
            });
        } else {
            return done(null, false);
        }
    });
  }
);

const schoolStrategy = new LocalStrategy({ usernameField: 'email' },
  (username, password, done) => {
      schoolModel.findOne({ email: username }, (err, user) => {
        if(err){
            return done(err);
        } if(user){
            return verify(password, user.pw, doesMatch => {
                return (doesMatch && user.isSchool) ? done(null, user) : done(null, false);
            });
        } else {
            return done(null, false);
        }
    });
  }
);

const signupStrategy = new LocalStrategy({ usernameField: 'phone' },
  (email, _password, done) => {
    userModel.findOne({ phone: username }, (err, user) => {
        if(err){
            return done(err);
        } if(!user){
            return done(null, false);
        }

        return done(null, user);
    });
  }
);

module.exports = {
    localStrategy: strategy,
    signupLocalStrategy: signupStrategy,
    modLocalStrategy: modStrategy,
    schoolLocalStrategy: schoolStrategy
};
