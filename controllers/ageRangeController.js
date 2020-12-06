// Model Imports
const AgeRange = require('../models/ageRange')



exports.all = function(req, res) {
    AgeRange.find(function(error, ageRanges) {
        if (error) {
            return res.status(422).send('Sorry!! Your request could not be processed at the moment, please try again')
        } else {
            return res.status(200).json(ageRanges)
        }
    });
}

exports.one = function(req, res) {
    AgeRange.findById(req.params._id, function(error, ageRange) {
            if (error) {
                return res.status(404).send('Sorry!! The queried Age Range could not be found or does not exist in our database')
            } else {
                return res.status(200).json(ageRange)
            }
        }
    );
}

exports.new = function(req, res) {
    let ageRangeData = req.body
    AgeRange.findOne({ range: ageRangeData.range }, function(error, createdAgeRange) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with creating this AgeRange.')
        }

        if (createdAgeRange) {
            return res.status(422).send('Sorry!! This Age Range already exists')
        } else {
            let ageRange = new AgeRange(ageRangeData)
            ageRange.save((error, createdAgeRange) => {
                if (error) {
                    console.log(error)
                } else {
                    return res.status(200).json(createdAgeRange)
                }
            });
        }
    });
}

exports.update = function(req, res) {
    let ageRangeData = req.body

    AgeRange.findByIdAndUpdate(req.params._id, { $set: ageRangeData }, function(error, ageRange) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your update request')
        } else {
            return res.status(200).json(ageRange)
        }
    });
}

exports.delete = function(req, res) {
    AgeRange.findByIdAndRemove(req.params._id, function(error, result) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your delete request')
        } else {
            return res.status(200).send('You have successfully deleted this ageRange')
        }
    });
}