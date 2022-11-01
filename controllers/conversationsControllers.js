const Conversations = require("../models/conversationsModel");
const Message = require("../models/messagesModel");
const User = require("../models/userModel");
const messagesController = require("./messagesControllers");



exports.createConversation = async (request, response) => {
    try {  

        const connectedUserId = request.body.userA;
        const otherUserId = request.body.userB; 
        let existConversation = await Conversations.findOne({ $or: [
                    { 
                        from:  connectedUserId, 
                        to: otherUserId
            },
            { 
                    from:  otherUserId,
                    to: connectedUserId   
            }  
          ]   })

        if (existConversation !== null) {
            return response.send({ message: "Conversation exists ", conversation: existConversation })
        }
         
        const newConversation = new Conversations({ 
            from: request.body.userA, to: request.body.userB              
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
  

    const connectedUserId = request.body.userA;
    const otherUserId = request.body.userB; 

    console.log(request.body)  
    Conversations.find({ 
            $or: [
                    { 
                        from:  connectedUserId, 
                        to: otherUserId
            },
            { 
                    from:  otherUserId,
                    to: connectedUserId   
            }  
          ]  
        
    })
        .populate({ path: "from", select: "firstName lastName userName email" })
        .populate({ path: "to", select: "firstName lastName userName email" })
        .populate({ path: "messages" })
    
        .then((conversations) => response.status(200).json({ conversations }))
    .catch(error => response.status(400).json({ error }))
}


exports.getOneConversation = async (request, response) => {
    const getMessageConversation = await Conversations.findOne({ _id: request.params.id }).populate({ path: "messages" })
    if (getMessageConversation === "undefined") return response.status(404).json({ error: error })

    await Conversations.findOne({ _id: request.params.id })
        .populate({ path: "messages" })
        .then((conversation) =>
            response.status(200).json(conversation))
        .catch(error => response.status(400).json({ error: error }))
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

exports.deleteOneConversation = async (request, response) => {
    try {
        await Conversations.findOneAndDelete({ _id: request.params.id })
            .then(() => response.status(200).json({ message: "A conversation deleted" }))
            .catch(error => response.status(400).json({ error }))
    }
    catch (error) {
        response.status(400).json({ error })
    }
}