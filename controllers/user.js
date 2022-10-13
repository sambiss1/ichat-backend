const User = require("../models/user")
const bcrypt = require("bcrypt");
const config = require("../config");
const jwt = require("jwt-simple")


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
    console.log("Logged In");
    User.findOne({ userName: req.body.username }, (err, user) => {
        if (err) {
            console.log("Error Happened In auth /token Route");
        } else {
            var payload = {
                id: user.id,
                expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
            };
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
                token: token,
            });
        }

        // bcrypt.compare(request.body.password, user.password)
        //     .then(valid => {
        //         if (!valid) {
        //             return response.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
        //         }
        //         return
        //     })
    });
};


// Get all user
exports.getAllUsers = ((request, response, next) => {
    User.find()
        .populate("messages") // key to populate
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
        await User.deleteMany()
            .then(() => response.status(200).json({ message: "All users account deleted" }))
    }
    catch (error) {
        response.status(400).json({ error: error })
    }
}       