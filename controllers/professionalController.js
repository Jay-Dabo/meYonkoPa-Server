// Model Imports
const Professional = require('../models/professional');

// API Routing Functions
exports.all = function(req, res) {
    Professional.find(function(error, professionals) {
        if (error) {
            return res.status(422).send('Sorry!! Your request could not be processed at the moment, please try again')
        } else {
            return res.json(professionals)
        }
    });
}

exports.update = function(req, res) {
    let professionalData = req.body

    Professional.findByIdAndUpdate(req.params._id, { $set: professionalData }, function(error, professional) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your update request')
        } else {
            return res.status(200).send(professional)
        }
    });
}

exports.one = function(req, res) {
    Professional.findById(req.params._id)
        .populate('profession')
        .exec(function(error, professional) {
            if (error) {
                return res.status(404).send('Sorry!! The queried Professional could not be found or does not exist in our database')
            } else {
                return res.status(200).json(professional)
            }
        }
    );
}

exports.register = function(req, res) {
    let professionalData = req.body

    // Presence Verification
    if (!professionalData.first_name) {
        return res.status(422).send('Please provide your First Name')
    }
    if (!professionalData.last_name) {
        return res.status(422).send('Please provide your Last Name')
    }
    if (!professionalData.email) {
        return res.status(422).send('Please provide your Email Address')
    }
    if (!professionalData.phone_number) {
        return res.status(422).send('Please provide your Phone Number')
    }
    if (!professionalData.medicalField) {
        return res.status(422).send('Please provide your Field of Practice')
    }
    if (!professionalData.password) {
        return res.status(422).send('Please provide your Password')
    }

    // Password Verification
    if (professionalData.password != professionalData.password_confirmation) {
        return res.status(422).json('Password & Password Confirmation do not match')
    }

    // Registered Professional Check
    Professional.findOne({ email: professionalData.email }, function(error, registeredProfessional) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your registration')
        }

        if (registeredProfessional) {
            return res.status(422).send('Sorry!! A Professional with this bio-data already exists.')
        } else {
            let professional = new Professional(professionalData)
            professional.save((error, registeredProfessional) => {
                if (error) {
                    return res.status(400).json(error)
                } else {
                    return res.status(200).json(registeredProfessional)
                }
            });
        }
    });
}

exports.login = function(req, res) {
    let professionalData = req.body

    // Presence Verification
    if (!professionalData._id) {
        return res.status(422).send('Please provide your unique ID')
    }
    if (!professionalData.password) {
        return res.status(422).send('Please provide your Password')
    }


    Professional.findOne({ _id: professionalData._id }, (error, professional) => {
        if (error) {
            return res.status(422).send('Oops! Something went wrong. Please try again.')
        }

        if (!professional) {
            return res.status(401).send('Sorry!! You do not have an account with us. You should consider registering first.')
        }

        if (!professional.hasSamePassword(professionalData.password)) {
            return res.status(401).send('Invalid Password')
        } else {
            return res.status(200).json(professional)
        }
    });
}

exports.delete = function(req, res) {
    Professional.findByIdAndRemove(req.params._id, function(error, result) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your delete request')
        } else {
            return res.status(200).send('You have successfully deleted this professional')
        }
    });
}