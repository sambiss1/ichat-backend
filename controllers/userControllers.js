const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy



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
// exports.logIn = (req, res) => {
//     User.findOne({ username: req.body.username })
//         .then(user => {
//             if (user === null) {
//                 res.status(401).json({
//                     success: false,
//                     message: 'User not found',
//                 })
//             }
//             else {
//                 bcrypt.compare(req.body.password, user.password)
//                     .then(valid => {
//                         if (!valid) {
//                             return res.status(401).json({
//                                 success: false,
//                                 message: 'incorrect password',
//                             })
//                         }
//                         //correct password
//                         const payload = {
//                             username: user.userName,
//                             id: user._id,
//                         }
//                         require('dotenv').config()
//                         const token = jwt.sign(payload, process.env.NODE_APP_JWT_SECRET, { expiresIn: '1d' })
//                         return res.status(200).json({
//                             payload: payload,
//                             success: true,
//                             message: "logged in successfully",
//                             token: "Bearer " + token
//                         })

//                     })
//                     .catch(err => res.status(500).json({ message: err }))
//             }
//         })
//         .catch(err => res.status(500).json({ message: err }))
// }


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

exports.login = function (request, response) {
    console.log("Logged In");
    User.findOne({ userName: request.body.username }, (error, user) => {
        if (error) {
            console.log("Error Happened In auth /token Route");
            response.status(401).json({ error })
        } else {
            var payload = {
                id: user._id,
                expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
            };
            var token = jwt.encode(payload, config.jwtSecret);
            response.json({
                token: token,
            });
        }
    });
};

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
        .populate("messages") // key to populate
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