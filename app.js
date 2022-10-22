const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messagesRoutes");
const conversationsRouter = require("./routes/conversationsRoutes");

const auth = require('./middleware/auth.js')();
const passport = require("passport");
const cors = require("cors");

const localStrategy = require("passport-local");
const User = require("./models/userModel");

const app = express();
app.use(cors())
app.use(express.json())


app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


mongoose.connect(`mongodb://${process.env.NODE_APP_DB_USER}:${process.env.NODE_APP_DB_PASSWORD}@${process.env.NODE_APP_DB_HOST}/${process.env.NODE_APP_DB_NAME}?replicaSet=rs0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(require("express-session")({
    secret: "s0m3$3Cret$h0lyC0d3&$",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
const restrictor = passport.authenticate('jwt', { session: false })



app.use("/api/user", userRouter);
app.use("/api/message", restrictor, messageRouter);
app.use("/api/conversations", restrictor, conversationsRouter);





// App final response 
app.use((request, response, next) => {
    console.log('Réponse envoyée avec succès !');
});

module.exports = app; 