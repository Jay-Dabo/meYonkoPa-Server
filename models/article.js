const mongoose = require('mongoose') // Require Mongooge for connection to Database
const Schema = mongoose.Schema // Require Schema Instace of Mongoose




const articleSchema = new Schema({
    _id: { type: String },
    title: { type: String, unique: true, required: true },
    content: { type: String, required: true },
    healthTopic: { type: Schema.Types.String, ref: 'healthTopic' },
    professional: { type: Schema.Types.String, ref: 'professional' },
})

// Export Model with the Category schema into Category Collection on MongoDb
module.exports = mongoose.model('article', articleSchema, 'Health Articles')