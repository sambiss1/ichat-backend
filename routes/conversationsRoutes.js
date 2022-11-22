const express = require("express");
const conversationController = require("../controllers/conversationsControllers");

const router = express.Router();

router.get("/:userA/:userB", conversationController.getConversationForTwoUsers);

router.get("/:active_user", conversationController.getAUserConversation);

router.get("/", conversationController.getAllConversations);


router.post("/new/:userA/:userB", conversationController.createConversation);

router.get("/:id", conversationController.getOneConversation);

router.delete("/", conversationController.deleteAllConversations);

router.delete("/:id", conversationController.deleteOneConversation);


module.exports = router;