const mongoose = require('mongoose') // Require Mongooge for connection to Database
const Schema = mongoose.Schema // Require Schema Instace of Mongoose




const medicalFieldSchema = new Schema({
    _id: { type: String },
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true }
})

// Export Model with the Category schema into Category Collection on MongoDb
module.exports = mongoose.model('medicalField', medicalFieldSchema, 'Medical Fields')