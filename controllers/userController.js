const cryptoRandomString = require('crypto-random-string'); // Use Cryptographic Random String or ID Generation
const http = require('http')

// Model Imports
const User = require('../models/user');

// API Routing Functions
exports.all = function(req, res) {
    User.find(function(error, users) {
        if (error) {
            return res.status(422).send('Sorry!! Your request could not be processed at the moment, please try again')
        } else {
            return res.json(users)
        }
    });
}

exports.update = function(req, res) {
    let userData = req.body

    User.findOneAndUpdate({ username: req.params.username }, { $set: userData }, function(error, user) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your update request')
        } else {
            return res.status(200).send(user)
        }
    });
}

exports.one = function(req, res) {
    User.findOne({ username: req.params.username })
    .populate('age_range')
    .exec(function(error, user) {
            if (error) {
                return res.status(404).send('Sorry!! The queried User could not be found or does not exist in our database')
            } else {
                return res.status(200).json(user)
            }
        }
    );
}

exports.register = function(req, res) {
    let userData = req.body

    // Presence Verification
    if (!userData.alias) {
        return res.status(422).send('Please provide your Alias')
    }

    if (!userData.age_range) {
        return res.status(422).send('Please select your appropriate Age Range')
    }

    if (!userData.email) {
        return res.status(422).send('Please provide your Email Address')
    }
    
    if (!userData.phone_number) {
        return res.status(422).send('Please provide your Phone Number')
    }
    
    if (!userData.password) {
        return res.status(422).send('Please provide your Password')
    }

    // Password Verification
    if (userData.password != userData.password_confirmation) {
        return res.status(422).json('Password & Password Confirmation do not match')
    }

    // Registered User Check
    User.findOne({$or: [{phone_number: userData.phone_number}, {email: userData.email}]}, function(error, registeredUser) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your registration')
        }

        if (registeredUser) {
            return res.status(422).send('Sorry!! A User with this bio-data already exists.')
        } else {
            let user = new User(userData)
            user.save((error, registeredUser) => {
                if (error) {
                    return res.status(400).json(error)
                } else {
                    const otp = cryptoRandomString({ length: 5, type: 'numeric' })
                    const to = registeredUser.phone_number
                    const msg = 'Welcome to meYonkoPa. Your OTP is ' + otp
                    const sender_id = 'meYonkoPa'
                    const smsApiOption = 'http://apps.mnotify.net/smsapi?key=8d1AjHlUbRnLsx7xHGgyd17Pj&to=' + to + '&sender_id=' + sender_id + '&msg=' + msg

                    var call = function(response) {
                        var str = ' '

                        response.on('data', function(chunk) {
                            str += chunk
                            return res.status(200).json(registeredUser)
                        })

                        response.on('end', function() {
                            console.log(str)
                        })
                    }

                    http.request(smsApiOption, call).end()
                }
            });
        }
    });
}

exports.login = function(req, res) {
    let userData = req.body
    var userid;
    // let userid = userData.username

    // Presence Verification
    // if (userid !== userData.email.value && userid !== userData.phone_number.value) {
    //     return res.status(422).send('Please provide your email or phone number')
    // }

    // if (!userData.email) {
    //     return res.status(422).send('Please provide your Email')
    // }
    
    if (!userData.password) {
        return res.status(422).send('Please provide your Password')
    }


    User.findOne({$or: [{ userid: userData.phone_number }, { userid: userData.email }]}, (error, user) => {
        if (error) {
            return res.status(422).send('Oops! Something went wrong. Please try again.')
        }

        if (!user) {
            return res.status(401).send('Sorry!! You do not have an account with us. You should consider registering first.')
        }

        if (!user.hasSamePassword(userData.password)) {
            return res.status(401).send('Invalid Password')
        } else {
            return res.status(200).json(user)
        }
    });
}

exports.delete = function(req, res) {
    User.findOneAndRemove({ username: req.params.username }, function(error, result) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your delete request')
        } else {
            return res.status(200).send('You have successfully deleted this user')
        }
    });
}