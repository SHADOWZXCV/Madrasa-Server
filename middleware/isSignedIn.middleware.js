const checkUserAuthentication = (req, res, next) => {
    if(!req.isAuthenticated())
        return res.status(401).end();

    next();
}
const checkSchoolRole = (req, res, next) => {
    if(!req.user.isSchool)
        return res.status(401).end();

    return next();
}

module.exports = {
    checkSchoolRole, 
    checkUserAuthentication
};
