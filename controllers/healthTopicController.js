// Model Imports
const HealthTopic = require('../models/healthTopic')

// API Routing Functions
exports.all = function(req, res) {
    HealthTopic.find(function(error, healthTopics) {
        if (error) {
            return res.status(422).send('Sorry!! Your request could not be processed at the moment, please try again')
        } else {
            return res.json(healthTopics);
        }
    });
}

exports.new = function(req, res) {
    let healthTopicData = req.body

    HealthTopic.findOne({ name: healthTopicData.name }, function(error, createdHealthTopic) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with creating this Educational HealthTopic.')
        }

        if (createdHealthTopic) {
            return res.status(422).send('Sorry!! This Health Topic already exists')
        } else {
            let healthTopic = new HealthTopic(healthTopicData)
            healthTopic.save((error, createdHealthTopic) => {
                if (error) {
                    return res.status(400).json(error)
                } else {
                    return res.status(200).send(createdHealthTopic)
                }
            })
        }
    })
}