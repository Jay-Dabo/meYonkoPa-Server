const express = require('express'); // Require Express Server
const router = express.Router(); // Require Routing for API endpints

// Require Mongooge for connection to Database
const mongoose = require('mongoose');

// Connect to Database in MongoDb
const db = "mongodb+srv://meyonkoPa-admin:meyonkoPa-admin-Pass@meyonkopa-traction.wf6ej.mongodb.net/meyonkoPa-Traction?retryWrites=true&w=majority"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, err => {
    if (err) {
        console.log('Sorry!! There has been an error: ' + err)
    } else {
        console.log('Successfully connected to database!! Keep building!!')
    }
});



// Import Controller files
const User = require('../controllers/userController');
const Professional = require('../controllers/professionalController');
const MedicalField = require('../controllers/medicalFieldController');
const HealthTopic = require('../controllers/healthTopicController');
const Article = require('../controllers/articleController');

// Root for endpoints
router.get('/', (req, res) => {
    res.send('meYonkoPa API route root')
});

// Routings for Users
router.get('/users', User.all);
router.get('/users/:username', User.one);
router.post('/user/login', User.login);
router.patch('/users/:username', User.update);
router.delete('/users/:username', User.delete);
router.post('/user/register', User.register);

// Routings for Professionals
router.get('/professionals', Professional.all);
router.get('/professionals/:_id', Professional.one);
router.post('/professional/login', Professional.login);
router.patch('/professionals/:_id', Professional.update);
router.delete('/professionals/:_id', Professional.delete);
router.post('/professional/register', Professional.register);

// Routing for Medical Fields
router.get('/medical-fields', MedicalField.all);
router.get('/medical-fields/:_id', MedicalField.one);
router.post('/medical-field/new', MedicalField.new);

// Routing for Health Topics
router.get('/health-topics', HealthTopic.all);
router.get('/health-topics/:_id', HealthTopic.one);
router.post('/health-topic/new', HealthTopic.new);

// Routings for Articles
router.get('/articles', Article.all);
router.post('/article/new', Article.new);
router.get('/articles/:_id', Article.one);
router.patch('/articles/:_id', Article.update);
router.delete('/articles/:_id', Article.delete);

module.exports = router