const express = require('express');
const { routes } = require('..');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');

router.get("/", (req, res, next) =>{
    User.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


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
        res.status(201).json({
            message: "handle POST requests to /users",
            createdUser: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        }); 
    });
});

router.get("/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid entry found for provided ID'})
        }
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:usersId', (req, res, next) => {
    const id = req.params.usersId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:usersId', (req, res, next) => {
    const id = req.params.usersId;
    User.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(202).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;