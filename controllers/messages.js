const Message = require("../models/messages");
const User = require("../models/user");
const Conversation = require("../models/conversations");

exports.createMessage = async (request, response) => {
    try {
        const message = new Message({
            ...request.body
        });

        const sender = await User.findById({ _id: message.sender._id }).populate("messages")
        sender.messages.push(message);
        await sender.save();

        const recipients = await User.findById({ _id: message.recipients }).populate("messages")
        recipients.messages.push(message);
        await recipients.save();

        await message.save()
            .then(() => {
                response.status(201).json(
                    { message: "Nouveau messsae", messageContent: message }
                )
            })
            .catch(error => response.status(400).json({ error: error }));
        
    }
    catch (err) {
        response.status(400).json({ success: false, message: err.message })
    }

}

exports.getParticipants = (request, response, next) => {

}
exports.getAllMessages = (request, response, next) => {
    Message.find()
        .populate("sender", "firstName lastName userName email")
        .populate("recipients", "firstName lastName userName email")
        .then((messages) => {

            response.status(201).json(
                {
                    messgae: messages
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