//imports router package & route files
const router = require("express").Router();
const apiController = require("./api");
const homeController = require("./home-controller");
const dashController = require("./dashboard-controller");

//sets router to redirect requests accordingly;
router.use("/api", apiController);
router.use("/", homeController);
router.use("/dashboard", dashController);

module.exports = router;