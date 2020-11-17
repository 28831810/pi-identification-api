const express = require('express');
const { routes } = require('..');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');


router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname
    });
    user
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: "handle POST requests to /users",
        createdUser: user
    });
});

router.get("/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:usersId', (req, res, next) => {
    res.status(200).json({
        message: 'Patched product'
    });
})

router.delete('/:usersId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product'
    });
})

module.exports = router;