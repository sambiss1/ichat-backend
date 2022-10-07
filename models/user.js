const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-validator");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: { type: String, unique: true },
    userStatus: Boolean
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema);