const express = require("express");
const {registerUser} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser);
// router.route("/refresh").get(registerUser)
    //router.route("/").post(registerUser);
    //router.post("/login", authUser);

module.exports = router;