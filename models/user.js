const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-validator");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    // confirmPassword: { type: String, required: true },
    userStatus: Boolean
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema);