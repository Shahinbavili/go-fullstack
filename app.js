const express = require('express');
const bodyParser = require("express");
const path = require("path");
const username = encodeURIComponent("shahinbavili");
const password = encodeURIComponent("sqh88BP4K4dUtVv");
const uri = `mongodb+srv://${username}:${password}@cluster0.yns2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const mongoose = require('mongoose');
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(err => console.error('Connexion à MongoDB échouée !', err));

const app = express();

app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;