const signInRouter = require('@Route/signin');
const signupRouter = require('@Route/signup/users');
const signupRouterSchools = require('@Route/signup/schools');
const dashboardRouter = require('@Route/main/dashboard');

module.exports = (app) => {
    app.use('/signin', signInRouter);
    app.use('/signup', signupRouter);
    app.use('/signup/schools', signupRouterSchools);
    app.use('/dashboard', dashboardRouter);
};
