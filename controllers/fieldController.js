// Model Imports
const Field = require('../models/field')

// API Routing Functions
exports.all = function(req, res) {
    Field.find(function(error, fields) {
        if (error) {
            return res.status(422).send('Sorry!! Your request could not be processed at the moment, please try again')
        } else {
            return res.json(fields);
        }
    });
}

exports.new = function(req, res) {
    let fieldData = req.body

    Field.findOne({ name: fieldData.name }, function(error, createdField) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with creating this Educational Field.')
        }

        if (createdField) {
            return res.status(422).send('Sorry!! This Medical Field already exists')
        } else {
            let field = new Field(fieldData)
            field.save((error, createdField) => {
                if (error) {
                    return res.status(400).json(error)
                } else {
                    return res.status(200).send(createdField)
                }
            })
        }
    })
}