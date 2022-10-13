const express = require("express");

const router = express.Router();
const userController = require("../controllers/user")
const passport = require("passport")


// Sign up user
router.post("/signup", userController.createUser);

// Sign in or login 
router.post("/login", passport.authenticate("local"), userController.login)

// Get user
router.get("/", userController.getAllUsers);

// Delete user 
router.delete("/:id", userController.deleteUser);

// delete all user
router.delete("/", userController.deleteAllUsers);

router.get("/:id", userController.getAUser);


module.exports = router;