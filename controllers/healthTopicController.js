// Model Imports
const HealthTopic = require('../models/healthTopic')
const Article = require('../models/article');

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

exports.one = function(req, res) {
    HealthTopic.findById(req.params._id)
        .populate('medical_field')
        .populate('censor')
        .exec(function(error, healthTopic) {
            if (error) {
                return res.status(404).send('Sorry!! The queried Health Topic could not be found or does not exist in our database')
            } else {
                return res.status(200).json(healthTopic)
            }
        }
    );
}

exports.common = function(req, res) {
    HealthTopic.find({ censor: req.params.censor }, function(error, healthTopics) {
        if (error) {
            return res.status(422).send('Sorry no Article currently exists for this category')
        } else {
            return res.status(200).json(healthTopics)
        }
    });
}

exports.latest = function(req, res) {
    const querystr = req.params.censor
    HealthTopic.find({ censor: querystr }, function(error, healthTopics) {
        if (error) {
            return res.status(422).send('Sorry no Health Topic currently exists for this age group')
        } else {
            Article.find({ censor: querystr }).sort({'createdAt' : -1}).limit(10).exec((error, articles) => {
                if (error) {
                    return res.status(422).send('Sorry!! The latest article list cannot be relayed to you now.');
                } else {
                    return res.status(200).json({
                        healthTopics, articles
                    })
                }
            });
        }
    });
}

// exports.latest = function(req, res) {
//     const querystr = req.params.censor
//     HealthTopic.find({ censor: querystr }, function(error, healthTopics) {
//         if (error) {
//             return res.status(422).send('Sorry no Health Topic currently exists for this age group')
//         } else {
//             for (var i = 0; i < healthTopics.length; i++) {            
//                 Article.find({$and: [{ censor: querystr }, { category: healthTopics[i]._id }]}).sort({'createdAt' : -1}).limit(10).exec((error, articles) => {
//                     if (error) {
//                         res.status(422).send('Sorry!! The latest article list cannot be relayed to you now.');
//                     } else {
//                         // return res.status(200).json({
//                         //     healthTopics, articles
//                         // })

//                         console.log(articles)
//                     }
//                 });
//             }
//         }
//     });
// }

exports.new = function(req, res) {
    let healthTopicData = req.body

    HealthTopic.findOne({ name: healthTopicData.name }, function(error, createdHealthTopic) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with creating this Health Topic.')
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

exports.update = function(req, res) {
    let healthTopicData = req.body

    HealthTopic.findByIdAndUpdate(req.params._id, { $set: healthTopicData }, function(error, healthTopic) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your update request')
        } else {
            return res.status(200).json(healthTopic)
        }
    });
}

exports.delete = function(req, res) {
    HealthTopic.findByIdAndRemove(req.params._id, function(error, result) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your delete request')
        } else {
            return res.status(200).send('You have successfully deleted this Health Topic')
        }
    });
}