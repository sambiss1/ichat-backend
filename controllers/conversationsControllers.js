const Conversations = require("../models/conversationsModel");
const Message = require("../models/messagesModel");
const User = require("../models/userModel");

exports.createConversation = async (request, response) => {
    try {
        const newConversation = new Conversations({
            participants: [request.body.userA, request.body.userB]
        });


        await newConversation.save()
            .then(() => {
                response.status(201).json(
                    { message: "New conversation", Conversation: newConversation }
                )
            })
            .catch(error => response.status(400).json({ error: error }));
    }
    catch (err) {
        response.status(400).json({ success: false, message: err.message })
    }

}


exports.getAllConversation = (request, response) => {
    Conversations.find()
        .populate({ path: "participants", select: "firstName lastName userName email" })
        .populate({ path: "messages" })
        .then((conversations) => response.status(200).json({ conversations }))
        .catch(error => response.status(400).json({ error }))
}

// exports.getOneConversation = (request, response) => {
//     Conversations.findOne({ $or: [{ sender: userA, receiver: userB }, { sender: userB, receiver: userA }] })
//         .populate({ path: "participants", select: "firstName lastName userName email" })

// }

// Delete all conversation
exports.deleteAllConversations = async (request, response) => {
    try {
        await Conversations.deleteMany()
            .then(() => response.status(200).json({ message: "All conversations deleted" }))
            .catch(error => response.status(400).json({ error }))
    }
    catch (error) {
        response.status(400).json({ error })
    }
}