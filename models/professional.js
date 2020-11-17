const mongoose = require('mongoose'); // Require Mongooge for connection to Database
const Schema = mongoose.Schema // Require Schema Instace of Mongoose
const bcrypt = require('bcryptjs'); // Require BCrypt for Password encryption
const cryptoRandomString = require('crypto-random-string'); // Use Cryptographic Random String or ID Generation


// Create Schema for Professionals in MongoDb
const professionalSchema = new Schema({
    _id: { type: String, default: 'myp' + cryptoRandomString({ length: 5 }) },
    first_name: { type: String, required: true },
    other_names: { type: String },
    last_name: { type: String, required: true },
    gender: { type: String },
    field: { type: Schema.Types.String, ref: 'field' },
    institute: { type: String },
    email: { type: String, lowercase: true, match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/], unique: true, required: true },
    phone_number: { type: String, required: true },
    birth_date: { type: Date, format: 'YYYY-mm-dd' },
    is_active: { type: Boolean, default: false },
    password: { type: String, min: [8, 'Too short, min 4 characters are required'], required: true },
    password_confirmation: { type: String, min: [8, 'Too short, min 4 characters are required'], required: true },
},
{ 
    timestamps: true 
});

professionalSchema.pre('save', function(next) {
    const professional = this
    bcrypt.genSalt(15, function(error, salt) {
        if (error) {
            return res.status(422).send('There is an error while generatiing salt hash')
        }
        bcrypt.hash(professional.password, salt, function(error, hash) {
            if (error) {
                return res.status(422).send('There is an error with password hashing')
            }
            // Replace Password field values with hashed password
            professional.password = hash
            professional.password_confirmation = hash
            next()
        });
    });
});

professionalSchema.methods.hasSamePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

// Export Model with the Professional schema into Professional Collection on MongoDb
module.exports = mongoose.model('professional', professionalSchema, 'Professionals');