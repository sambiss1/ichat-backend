require('dotenv').config()
const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy
const config = require("../config")


// Create an user 
// Register
exports.createUser = ((request, response, next) => {
    bcrypt.hash(request.body.password, 10)
        .then(hash => {
            const user = new User({
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                userName: request.body.userName,
                email: request.body.email,
                password: hash
            });
            user.save()
                .then(() => response.status(201).json({ message: 'Création du compte avec succès !' }))
                .catch(error => response.status(400).json({ error: error }));
        })
        .catch(error => response.status(500).json({ error: error }))
}) 
   
//Sign in
exports.login = (request, response) => {
    User.findOne({ userName: request.body.username })
        .then(user => {
            if (user === null) {
                response.status(401).json({
                    success: false,
                    message: 'User not found',
                }) 
            }
            else {

                const payload = {
                    userName: user.username,
                    id: user._id,
                    expire: '1d'
                }
                const token = jwt.encode(payload, config.jwtSecret)

                //correct password
                bcrypt.compare(request.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return response.status(401).json({
                                success: false,
                                message: 'incorrect username or password',
                            })
                        } else {

                            return response.status(200).json({
                                payload: payload,
                                success: true,
                                message: "logged in successfully",
                                token: "Bearer " + token
                            })
                        }

                    })
                    .catch(err => response.status(500).json({ message: err }))
            }
        })
        .catch(err => response.status(500).json({ message: err }))
}



// Get all user
exports.getAllUsers = ((request, response, next) => {
    User.find()
        .then((users) => response.status(200).json(users))
        .catch(error => response.status(400).json({ error }))
})

// Delete an user
exports.deleteUser = ((request, response, next) => {
    User.deleteOne({ _id: request.params.id })
        .then(() => response.status(200).json({ message: "User deleted" }))
        .catch(error => response.status(400).json({ error }))
})


// Get an user
exports.getAUser = (request, response) => {
    User
        .findOne({ _id: request.params.id })
        // .populate("messages") // key to populate
        .then(user => {
            response.json(user);
        });
}

// Delete all user 
exports.deleteAllUsers = async (request, response) => {
    try {
        await User.remove()
            .then(() => response.status(200).json({ message: "All users account deleted" }))
    }
    catch (error) {
        response.status(400).json({ error: error })
    }
}       