const Conversations = require("../models/conversationsModel");
const Message = require("../models/messagesModel");
const User = require("../models/userModel");

exports.createConversation = async (request, response) => {
    try {
        const newConversation = new Conversations({
            ...request.body
        });

        // const message = await Message.findById({ _id: message._id })
        // await message.save();

        // const participants = await User.findById({ _id: participants._id })

        // await participants.save();

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
        .populate({ path: "participants", select: "firstName lastName userName email", model: User })
        .populate({ path: "messages", model: Message })
        .then((conversations) => response.status(200).json({ conversations }))
        .catch(error => response.status(400).json({ error }))
}

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