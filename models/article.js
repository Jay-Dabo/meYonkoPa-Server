const mongoose = require('mongoose') // Require Mongooge for connection to Database
const Schema = mongoose.Schema // Require Schema Instace of Mongoose




const articleSchema = new Schema({
    _id: { type: String },
    title: { type: String, unique: true, required: true },
    content: { type: String, required: true },
    category: { type: Schema.Types.String, ref: 'healthTopic', default: 'G.Health' },
    author: { type: Schema.Types.String, ref: 'professional', default: 'meYonkoPa' },
})

// Export Model with the Category schema into Category Collection on MongoDb
module.exports = mongoose.model('article', articleSchema, 'Health Articles')