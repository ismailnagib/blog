const Article = require('../models/articleModel')

module.exports = {
    
    show: function(req, res) {
        Article.find({})
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    showOne: function(req, res) {
        Article.findById(req.params.id)
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    add: function(req, res) {
        Article.create({
            title: req.body.title,
            content: req.body.content
        })
        .then(data => {
            res.status(201).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    remove: function(req, res) {
        Article.deleteOne({
            title: req.body.title
        })
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    }
}