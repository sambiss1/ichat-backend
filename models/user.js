const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    userName: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    userStatus: { type: Boolean, required: false },
    image: { type: String, required: false },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
}, { timestamps: true })

userSchema.plugin(uniqueValidator);
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);