const express = require("express");

const router = express.Router();
const messagesController = require("../controllers/messages")


// Sign up user
router.post("/new", messagesController.createMessage);

// Get user
router.get("/", messagesController.getAllMessages);

// Delete user 
// router.delete("/:id", userController.deleteUser);

// Get a message
router.get("/:id", messagesController.getOneMessage);

router.delete("/", messagesController.deleteAllMessage);

module.exports = router;