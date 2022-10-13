const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const messageRouter = require("./routes/messages");
const conversationsRouter = require("./routes/conversations");

const app = express();
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


app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);
app.use("/api/conversations", conversationsRouter);

// App final response
app.use((request, response, next) => {
    console.log('Réponse envoyée avec succès !');
});

module.exports = app;