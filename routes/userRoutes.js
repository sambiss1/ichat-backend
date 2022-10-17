const express = require("express");
// const passport = require("passport");
const passport = require("../middleware/protectedAuth")

const router = express.Router();
const userController = require("../controllers/userControllers")



// Sign up user
router.post("/signup", userController.createUser);

// Sign in (login)
router.post("/login", userController.login)


// Get user
router.get("/", userController.getAllUsers);

// Delete user 
router.delete("/:id", userController.deleteUser);

// delete all user
router.delete("/", userController.deleteAllUsers);

router.get("/:id", userController.getAUser);


module.exports = router;