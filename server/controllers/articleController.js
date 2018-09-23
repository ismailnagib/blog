const Article = require('../models/articleModel')

module.exports = {
    
    show: function(req, res) {
        Article.find({})
        .populate('author')
        .populate({
            path: 'comments',
            populate: {path: 'commenter'}
        })
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    showOne: function(req, res) {
        Article.findById(req.params.id)
        .populate('author')
        .populate({
            path: 'comments',
            populate: {path: 'commenter'}
        })
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
            content: req.body.content,
            location: req.body.loc,
            author: req.userId
        })
        .then(data => {
            res.status(201).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    edit: function(req, res) {
        Article.updateOne({
            _id: req.body.id,
            author: req.userId
        }, {
            title: req.body.title,
            content: req.body.content
        })
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    remove: function(req, res) {
        Article.deleteOne({
            _id: req.body.id,
            author: req.userId 
        })
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    search: function(req, res) {
        Article.find({
            title: new RegExp('\S*'+req.body.keyword+'\S*','i')
        })
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    }
}