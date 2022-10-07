const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json())


mongoose.connect(`mongodb://${process.env.NODE_APP_DB_USER}:${process.env.NODE_APP_DB_PASSWORD}@${process.env.NODE_APP_DB_HOST}/${process.env.NODE_APP_DB_NAME}?replicaSet=rs0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = app;