const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')



// Login Controller
const login = (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            // checking user Existance
            res.status(401).json({message: `You haven't account on this email` })
        } else {
            // Comparing password
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    res.status(500).json({
                        error: err
                    })
                }
                if (result) {
                    // Create a Token and Store it in Cookie
                    const token = jwt.sign({
                        email: user.email,
                        userID: user._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '3h'
                        })
                    req.toastr.success(`Welcome back boss !!`,'ERROR!')
                    res.cookie('access_token', token, {
                        httpOnly: true
                    }).status(200).json({
                        message: 'Authentication Successful and Token Generated and stored in cookie',
                        token: token
                    })
                } else {
                    req.toastr.error(`Please Valid password !!`,'ERROR!')
                    res.status(500).json({
                        message: 'Authentication Failed Plese Enter Right Passwords'
                    })
                }
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}


// Logout Controller
const logout = async (req, res) => {
    try {
         res.clearCookie("access_token")
         
         res.status(200).json({
            message: "you Successfully Logout yourself"
        })
    } catch (err) {
        res
            .status(500)
            .json({
                error: err
            })
    }
}

module.exports = {
    login,
    logout
}