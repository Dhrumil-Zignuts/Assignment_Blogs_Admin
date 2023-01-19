const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const User = require('../model/userModel')


const login = (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email }).then(user => {
        if (user < 1) {
            res.status(401).json({
                message: 'Authentication failed'
            })
        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    res.status(500).json({
                        error: err
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userID: user._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        })
                    res.status(201).json({
                        message: 'Authentication Successful and Token Generated and stored in cookie',
                        token: token
                    })
                } else {
                    res.status(500).json({
                        message: 'Authentication Failed Plese Enter Right Passwords'
                    })
                }
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
}


module.exports = {
    login
}