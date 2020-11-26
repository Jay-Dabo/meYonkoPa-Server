// Model Imports
const Article = require('../models/article');

// API Routing Functions
exports.all = function(req, res) {
    Article.find(function(error, articles) {
        if (error) {
            return res.status(422).send('Sorry!! Your request could not be processed at the moment, please try again')
        } else {
            return res.json(articles)
        }
    });
}

exports.update = function(req, res) {
    let articleData = req.body

    Article.findByIdAndUpdate(req.params._id, { $set: articleData }, function(error, article) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your update request')
        } else {
            return res.status(200).send(article)
        }
    });
}

exports.one = function(req, res) {
    Article.findById(req.params._id)
        .populate('category')
        .populate('author')
        .exec(function(error, article) {
            if (error) {
                return res.status(404).send('Sorry!! The queried Article could not be found or does not exist in our database')
            } else {
                return res.status(200).json(article)
            }
        }
    );
}

exports.new = function(req, res) {
    let articleData = req.body

    // Registered Article Check
    Article.findOne({ title: articleData.title }, function(error, createdArticle) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with creating your article')
        }

        if (createdArticle) {
            return res.status(422).send('Sorry!! An Article with this title already exists.')
        } else {
            let article = new Article(articleData)
            article.save((error, createdArticle) => {
                if (error) {
                    return res.status(400).json(error)
                } else {
                    return res.status(200).json(createdArticle)
                }
            });
        }
    });
}

exports.delete = function(req, res) {
    Article.findByIdAndRemove(req.params._id, function(error, result) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your delete request')
        } else {
            return res.status(200).send('You have successfully deleted this article')
        }
    });
}