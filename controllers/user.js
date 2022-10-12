const User = require("../models/user")
const bcrypt = require("bcrypt")


// Create an user 
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