const express = require('express');
const dashboardRouter = express.Router();
const multer = require('multer');
const { getDashboardData, getModTableData } = require('@Controller/protected/main/getDashboard');
const { checkUserAuthentication, checkSchoolRole } = require('@Middleware/isSignedIn.middleware');
const { handleAddRoute } = require('@Controller/protected/main/addRoute');
const { handleAddChild } = require('@Controller/protected/main/addChild');

const multerStorage = multer.diskStorage({
    destination: (req, file, done) => done(null, "public"),
    filename: (req, file, done) => {
        const ext = file.mimetype.split('/')[1];
        done(null, `childrenPics/${file.fieldname}-${Date.now()}.${ext}`)
    }
})

const multerFilter = (req, file, done) => {
    if (file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "jpeg") {
        done(null, true);
    } else {
        done(new Error("Not an image File!!"), false);
    }
}
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

dashboardRouter.get('/', checkUserAuthentication, checkSchoolRole, getDashboardData);
dashboardRouter.get('/tableDataByMod/:modno', checkUserAuthentication, checkSchoolRole, getModTableData);
dashboardRouter.post('/add', 
checkUserAuthentication,
checkSchoolRole,
handleAddRoute,
getDashboardData);

dashboardRouter.post('/add/child', 
checkUserAuthentication,
checkSchoolRole,
upload.single('files'),
handleAddChild);

module.exports = dashboardRouter;
