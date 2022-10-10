const mongoose = require("mongoose");
const { Schema } = mongoose.Schema

const MessageSchema = mongoose.Schema({
    sender:
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
    ,
    messageText: { type: String },
    messageImage: { type: String },
    dateSent: { type: String },
    dateReceived: { type: String }
})

module.exports = mongoose.model("Message", MessageSchema = mongoose.Schema);