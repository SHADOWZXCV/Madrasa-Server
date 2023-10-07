require('dotenv').config();
require('module-alias/register');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const registerRoutes = require('@Route');
const { getConnection } = require('@Models');
const { userModel } = require('@Models/user');
const { schoolModel } = require('@Models/school');
const { signupLocalStrategy, localStrategy, modLocalStrategy, schoolLocalStrategy } = require('@Controller/authentication/localStrategy.passport');
const { corsOptions, checkState } = require('./config');
const morganMiddleware = require('./middleware/morganLogger.middleware');
const logger = require('@Util/log');
const app = express();
// TODO: check session differentiation for user roles.
app.use(cors(corsOptions));
app.use(
    session({
      secret: process.env.SS,
      name: process.env.secretSessionName,
      sameSite: true,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        client: getConnection().getClient(),
        dbName: process.env.dbName,
        collectionName: "sessions",
        // For some reason all below is
        // not useful in any shape or form
        // what I found is that the max age already does all the work!
        // autoRemove: 'interval',
        // autoRemoveInterval: 1
        // ttl: 1
      }),
      // cookie: {
      //   maxAge: 1000 * 6,
      //   sameSite: true,
      // }
    })
);
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
registerRoutes(app);


passport.use('local', localStrategy);
passport.use('signup-local', signupLocalStrategy);
passport.use('mod-local', modLocalStrategy);
passport.use('school-local', schoolLocalStrategy);
passport.serializeUser((user, done) => {
  // specify type of user, there are currently 3 types: mod, school and parent
  const modelType = user.constructor.prototype.collection.modelName;
  logger.debug(`${modelType} account is serializing..`); 
  done(null, { id: user.id, type: modelType });
});
passport.deserializeUser((data, done) => {
  const { type, id } = data;

  if(type === 'Parent')
  {
    logger.debug('parent account is deserializing..'); 
     userModel.findById(id, function(err, user) {
        done(err, user);
    });
  }
  else if(type === 'School')
  {
    logger.debug('school account is deserializing..');
    schoolModel.findById(id, function(err, user) {
        done(err, user);
      });
  }
  else 
    throw Error('not defined user deserialization is denied!');
});

checkState();
app.listen(3000, () => logger.info("Chill is on port 3000"));
