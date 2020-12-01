const mongoose = require('mongoose') // Require Mongooge for connection to Database
const Schema = mongoose.Schema // Require Schema Instace of Mongoose

// Censorship Enumerations
const ageRanges = Object.freeze({
    Child: '10 to 15 years',
    Teen: '16 to 19 years',
    Adult: '20 to 35 years',
});


const articleSchema = new Schema({
    _id: { type: String },
    title: { type: String, unique: true, required: true },
    content: { type: String, required: true },
    censor: [{ type: String, required: true, enum: Object.values(ageRanges) }],
    category: { type: Schema.Types.String, ref: 'healthTopic', default: 'G.Health' },
    author: { type: Schema.Types.String, ref: 'professional', default: 'meYonkoPa' },
},
{ 
    timestamps: true 
});

Object.assign(articleSchema.statics, {
    ageRanges
});

// Export Model with the Category schema into Category Collection on MongoDb
module.exports = mongoose.model('article', articleSchema, 'Health Articles')