const mongoose = require("mongoose");
const { Schema } = mongoose.Schema

const messageSchema = mongoose.Schema({
    sender:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    ,
    recipients:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    ,
    messageText: { type: String, required: false },
    messageImage: { type: String, required: false },
    dateSent: { type: String, required: false },
    dateReceived: { type: String, required: false }
},{ timestamps: true })

module.exports = mongoose.model("Message", messageSchema);