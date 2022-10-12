const express = require("express");

const router = express.Router();
const userController = require("../controllers/user")


// Sign up user
router.post("/signup", userController.createUser);

// Get user
router.get("/", userController.getAllUsers);

// Delete user 
router.delete("/:id", userController.deleteUser);

router.get("/:id", userController.getAUser);


module.exports = router;