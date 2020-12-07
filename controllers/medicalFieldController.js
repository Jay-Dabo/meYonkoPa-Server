// Model Imports
const MedicalField = require('../models/medicalField')

// API Routing Functions
exports.all = function(req, res) {
    MedicalField.find(function(error, medicalFields) {
        if (error) {
            return res.status(422).send('Sorry!! Your request could not be processed at the moment, please try again')
        } else {
            return res.json(medicalFields);
        }
    });
}

exports.one = function(req, res) {
    MedicalField.findById(req.params._id, function(error, medicalField) {
            if (error) {
                return res.status(404).send('Sorry!! The queried Medical Field could not be found or does not exist in our database')
            } else {
                return res.status(200).json(medicalField)
            }
        }
    );
}

exports.new = function(req, res) {
    let medicalFieldData = req.body

    // Presence Verification
    if (!medicalFieldData._id) {
        return res.status(422).send('Please provide a unique identifier of the Medical Field')
    }
    if (!medicalFieldData.name) {
        return res.status(422).send('Please provide the name of the Medical Field')
    }
    if (!medicalFieldData.description) {
        return res.status(422).send("Please provide the field's description")
    }

    MedicalField.findOne({ name: medicalFieldData.name }, function(error, createdMedicalField) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with creating this Medical Field.')
        }

        if (createdMedicalField) {
            return res.status(422).send('Sorry!! This Medical Field already exists')
        } else {
            let medicalField = new MedicalField(medicalFieldData)
            medicalField.save((error, createdMedicalField) => {
                if (error) {
                    return res.status(400).json(error)
                } else {
                    return res.status(200).send(createdMedicalField)
                }
            })
        }
    })
}

exports.update = function(req, res) {
    let medicalFieldData = req.body

    MedicalField.findByIdAndUpdate(req.params._id, { $set: medicalFieldData }, function(error, medicalField) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your update request')
        } else {
            return res.status(200).json(medicalField)
        }
    });
}

exports.delete = function(req, res) {
    MedicalField.findByIdAndRemove(req.params._id, function(error, result) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your delete request')
        } else {
            return res.status(200).send('You have successfully deleted this Medical Field')
        }
    });
}