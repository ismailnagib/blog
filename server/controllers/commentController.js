const Comment = require('../models/commentModel')

module.exports = {
    
    show: function(req, res) {
        Comment.find({})
        .populate('writer')
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    add: function(req, res) {
        Comment.create({
            title: req.body.title,
            content: req.body.content,
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
        Comment.updateOne({
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
        Comment.deleteOne({
            _id: req.body.id,
            author: req.userId 
        })
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    }
}