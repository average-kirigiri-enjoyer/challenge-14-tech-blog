//imports router package & API route files
const router = require("express").Router();
const userRoutes = require("./user-controller");
const postRoutes = require("./post-controller");

//sets router to redirect requests accordingly;
router.use("/users", userRoutes);
router.use("/blog-post", postRoutes);

module.exports = router;