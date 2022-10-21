const router = require("express").Router();
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");
const reviewRoutes = require("./reviewRoutes");

router.use("/users", userRoutes);
router.use("/comment", commentRoutes);
router.use("/review", reviewRoutes);

module.exports = router;
