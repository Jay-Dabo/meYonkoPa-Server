const mongoose = require('mongoose'); // Require Mongooge for connection to Database
const Schema = mongoose.Schema // Require Schema Instace of Mongoose
const bcrypt = require('bcryptjs'); // Require BCrypt for Password encryption

// Gender Enumerations
const genders = Object.freeze({
    Male: 'Male',
    Female: 'Female',
    Other: 'Non Binary',
});

// Create Schema for Users in MongoDb
const userSchema = new Schema({
    alias: { type: String, required: true},
    gender: { type: String, required: true, enum: Object.values(genders) },
    email: { type: String, lowercase: true, match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/], unique: true, required: true },
    phone_number: { type: String, required: true, unique: true },
    age_range: { type: String, required: true, ref: 'ageRange' },
    is_active: { type: Boolean, default: false },
    password: { type: String, min: [8, 'Too short, min 4 characters are required'], required: true },
    password_confirmation: { type: String, min: [8, 'Too short, min 4 characters are required'], required: true },
},
{ 
    timestamps: true 
});

Object.assign(userSchema.statics, {
    // ageRanges,
    genders
});

userSchema.pre('save', function(next) {
    const user = this
    bcrypt.genSalt(15, function(error, salt) {
        if (error) {
            return res.status(422).send('There is an error while generatiing salt hash')
        }
        bcrypt.hash(user.password, salt, function(error, hash) {
            if (error) {
                return res.status(422).send('There is an error with password hashing')
            }
            // Replace Password field values with hashed password
            user.password = hash
            user.password_confirmation = hash
            next()
        });
    });
});

userSchema.methods.hasSamePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

// Export Model with the User schema into User Collection on MongoDb
module.exports = mongoose.model('user', userSchema, 'Users');