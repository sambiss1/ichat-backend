const Message = require("../models/messagesModel");
const User = require("../models/userModel");
const Conversation = require("../models/conversationsModel");

exports.createMessage = async (request, response) => {
    try {
        const message = new Message({
            ...request.body
        });

        const conversationId = await Conversation.findById({ _id: request.body.conversationId })

        if (conversationId === null) {
            return response.send("Conversation doesn't exists ")
        }
        await message.save();
        Conversation.findByIdAndUpdate({ _id: request.body.conversationId }, {
            $push: { messages: message }
        }).then((messages) => response.status(200).json({
            response: "Nouveu message ajouté dans la conversation",
            newMessage: messages
        }))
            .catch(error => response.status(400).json({ error: error }));


    }
    catch (err) {
        response.status(400).json({ success: false, message: err.message })
    }
}

exports.getAllMessages = (request, response, next) => {
    Message.find()
        .populate("sender", "firstName lastName userName email")
        .then((messages) => {

            response.status(201).json(
                {
                    message: messages
                }

            )
        })
        .catch(error => response.status(400).json({ error }));
}

exports.getOneMessage = (request, response) => {
    Message.findOne({ _id: request.params.id })
        .populate("sender", "firstName lastName userName email")
        .populate("recipients", "firstName lastName userName email")
        .then((message) => response.status(200).json({ message }))
        .catch(error => response.status(400).json({ error }))
}

exports.deleteAllMessage = async (request, response) => {
    try {
        await Message.deleteMany()
            .then(() => response.status(200).json({ message: "All messages deleted" }))
    }
    catch (error) {
        response.status(400).json({ error })
    }
}