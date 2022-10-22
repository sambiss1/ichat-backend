const express = require("express");
const conversationController = require("../controllers/conversationsControllers");

const router = express.Router();

router.get("/", conversationController.getAllConversation);


router.post("/new", conversationController.createConversation);

router.get("/:id", conversationController.getOneConversation);

router.delete("/", conversationController.deleteAllConversations);

router.delete("/:id", conversationController.deleteOneConversation);


module.exports = router;