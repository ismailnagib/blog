const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    register: function(req, res, next) {
        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(req.body.password, salt);
    
        User.findOne({
          email: req.body.email
        })
        .then(data => {
            if(data) {
                res.status(500).json({message: 'Email has been registered before'})
            } else {
                if (req.body.password.length >= 6) {
                    User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPassword
                    })
                    .then(data => {
                        res.status(201).json({data: data})
                    })
                    .catch(err => {
                        res.status(500).json({message: err})
                    })
                } else {
                res.status(500).json({message: 'Password should contain at least 6 characters'})
                }
            }
        })
    },

    login: function(req, res, next) {
        if(!req.body.email || !req.body.password) {
            res.status(400).json({message: 'You should input your email and password to log in'})
        } else {
            User.findOne({
                email: req.body.email
            }, function(err, user) {
                if(user) {
                    let passwordValid = bcrypt.compareSync(req.body.password.toString(), user.password)
                    if(passwordValid) {
                        var token = jwt.sign({ email: user.email }, process.env.JWT_KEY);
                        res.status(200).json({token: token, userId: user._id})
                    } else {
                        res.status(400).json({message: 'Wrong password'})
                    }
                } else {
                res.status(400).json({message: 'The email is unregistered'})
                }
            })
        }
    },
}