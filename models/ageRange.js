const mongoose = require('mongoose'); // Require Mongooge for connection to Database
const Schema = mongoose.Schema // Require Schema Instace of Mongoose

// Create Schema for Category in MongoDb
const ageRangeSchema = new Schema({
    _id: { type: String },
    range: { type: String, unique: true, required: true }
});

module.exports = mongoose.model('ageRange', ageRangeSchema, 'Age Ranges')