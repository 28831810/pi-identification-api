const express = require('express');
const { routes } = require('..');
const router = express.Router();
const mongoose = require('mongoose');

const UserInfo = require('../models/userInfo');
const User = require('../models/users');


router.get('/', (req, res, next) => {
    UserInfo.find()
    .select('user quantity _id')
    .populate('user', '_id name surname')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            userInfo: docs.map(doc => {
                return {
                    _id: doc._id,
                    user: doc.user,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://loaclhost:3838/usersInfo/' + doc._id
                    }
                }
            })  
        });      
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.post('/', (req, res, next) => {
    User.findById(req.body.userId)
    .then(user => {
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }
        const userInfo = new UserInfo({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            user: req.body.userId
        });
        return userInfo
        .save()
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'More Info about user stored',
            createdUserInfo: {
                _id: result._id,
                user: result.user,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: 'http://loaclhost:3838/usersInfo/' + result._id

            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.get('/:usersInfoId', (req, res, next) => {
    UserInfo.findById(req.params.usersInfoId)
    .populate('user', '_id name surname')
    .exec()
    .then(userInfo => {
        if(!userInfo){
            return res.status(404).json({
                message: 'order not found'
            })
        }
        res.status(200).json({
            userInfo: userInfo,
            request: {
                type: 'GET',
                url: 'http://localhost:3838/usersInfo'
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.delete('/:usersInfoId', (req, res, next) => {
    UserInfo.remove({ _id: req.params.usersInfoId })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "userInfo deleted",
            request: {
                type: 'POST',
                url: 'http://localhost:3838/usersInfo',
                body: { userId: "ID", quantity:"Number" }
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;