const Message = require("../models/messages");
const User = require("../models/user");


exports.createMessage = async (request, response) => {
    try {
        const message = new Message({
            ...request.body
        });
        await message.save();

        const sender = await User.findById({ _id: message.sender })
        // sender.messages.push(message);
        sender.messages(...message);
        await sender.save();

        const recipients = await User.findById({ _id: message.recipients }).populate("message")
        // recipients.message.push(message);
        recipients.messages[{ ...message }];
        await recipients.save();

        response.status(201).json({ message: "Nouveau messsae", messageContent: message })
    }
    catch (err) {
        response.status(400).json({ success: false, message: err.message })
    }

    // message.save()
    //     .then(() => response.status(201).json(
    //         { message: "Nouveau messsae", messageContent: message }
    //     ))
    //     .catch(error => response.status(400).json({ error }));
}

exports.getParticipants = (request, response, next) => {

}
exports.getAllMessages = async (request, response, next) => {
    Message.find()
        .populate({
            path: "User"
        })
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
    Message.findOne({ _id: request.params.id }, {
        password: 0
    })
        .populate("sender", "firstName lastName userName email")
        .populate("recipients", "firstName lastName userName email")
        .then((message) => response.status(200).json({ message }))
        .catch(error => response.status(400).json({ error }))
}