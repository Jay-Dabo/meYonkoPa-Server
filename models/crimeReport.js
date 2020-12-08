const mongoose = require('mongoose'); // Require Mongooge for connection to Database
const Schema = mongoose.Schema // Require Schema Instace of Mongoose

// Create Schema for Category in MongoDb
const crimeReportsSchema = new Schema({
    _id: { type: String },
    committedOffense: { type: String, unique: true, required: true },
    eventNarration: { type: String, required: true }
});

module.exports = mongoose.model('crimeReports', crimeReportsSchema, 'Crime Reports')