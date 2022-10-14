const express = require("express");
const conversationController = require("../controllers/conversationsControllers");

const router = express.Router();

router.get("/", conversationController.getAllConversation);


router.post("/new", conversationController.createConversation);


router.delete("/", conversationController.deleteAllConversations);


module.exports = router;