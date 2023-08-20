const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const bcrypt = require('bcrypt')
require('dotenv').config()


//  //Signup
authRouter.post('/signup', (req, res, next) => {
    User.findOne(
        {username: req.body.username}, (err, user) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        if(user) {
            res.status(403)
            return next( new Error('This username is already taken'))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({token, user: savedUser.withoutPassword()})
        })
    })
})

//Login
authRouter.post('/login', (req, res, next) => {
    User.findOne(
        {username: req.body.username.toLowerCase() }, (err, user) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(!user) {
                res.status(403)
                return next(new Error('Username or Password incorrect'))
            }
            user.checkPassword(req.body.password, (err, isMatch) => {
                if(err) {
                    res.status(403)
                    return next(new Error('Username and/or Password is incorrect'))
                }
                if(!isMatch) {
                    res.status(403)
                    return next(new Error('Username and/or Password is incorrect'))
                }
                const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
                return res.status(201).send({token, user: user.withoutPassword()}) 
            })

         })
})

//Edit Password
authRouter.put('/passupdate/:userId', ( req, res, next) => {
    const { currentPass, newPass, confirmedPass } = req.body
    //Check Password confirmation
    if(newPass !== confirmedPass) {
        next(new Error('Passwords do not match'))
    }
    
    User.findOneAndUpdate(
        {_id: req.params.userId},
        { password: newPass },
        (err, user) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            //Check against current password
            bcrypt.compare(currentPass, user.password, (err, isMatch) => {
                if(err) {
                    return next(err)
                }
                if(!isMatch){
                    return next(new Error('Passwords do not math'))
                }
                else {

                    return res.status(201).send('Changed Password!')
                }
            })
        }
    )
    
})




module.exports = authRouter
