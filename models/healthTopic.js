const mongoose = require('mongoose') // Require Mongooge for connection to Database
const Schema = mongoose.Schema // Require Schema Instace of Mongoose




const healthTopicSchema = new Schema({
    _id: { type: String },
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    censor: [{ type: String, required: true, ref: 'ageRange' }],
    medical_field: { type: Schema.Types.String, ref: 'medicalField', default: 'General' },
})

// Export Model with the Category schema into Category Collection on MongoDb
module.exports = mongoose.model('healthTopic', healthTopicSchema, 'Health Topics')