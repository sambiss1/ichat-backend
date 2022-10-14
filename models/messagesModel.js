const mongoose = require("mongoose");
const { Schema } = mongoose.Schema

const messageSchema = mongoose.Schema({
    conversationId: { type: String },
    sender:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    ,
    messageText: { type: String, required: false },
    messageImage: { type: String, required: false },
}, { timestamps: true })

module.exports = mongoose.model("Message", messageSchema);