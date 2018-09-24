const Comment = require('../models/commentModel')
const Article = require('../models/articleModel')
const User = require('../models/userModel')

module.exports = {
    
    show: function(req, res) {
        Comment.find({})
        .populate('commenter')
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    add: function(req, res) {
        Comment.create({
            words: req.body.words,
            commenter: req.userId
        })
        .then(comment => {
            Article.findById(req.body.postId)
            .then(article => {
                let comments = article.comments
                comments.push(comment._id)
                Article.updateOne({
                    _id: req.body.postId
                }, {
                    comments: comments
                })
                .then(data => {
                    res.status(201).json({data: comment})
                })
                .catch(err => {
                    res.status(500).json({message: err})
                })
            })
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    remove: function(req, res) {
        Comment.deleteOne({
            _id: req.body.id,
            commenter: req.userId
        })
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    }
}