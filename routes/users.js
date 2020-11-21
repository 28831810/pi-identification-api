const express = require("express");
//const { routes } = require('..');
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 10
    }//,
    //fileFilter: fileFilter
  });

const User = require('../models/users');

//gets all users within the DB
router.get("/", (req, res, next) =>{
    User.find()
    .select('name surname _id userImage')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            users: docs.map(doc =>{
                return {
                    name: doc.name,
                    surname: doc.surname,
                    userImage: doc.userImage,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url:'http://localhost:3838/users/' + doc._id //insert azure web app url when building!!!!
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//get's the specific user with _id in the DB
router.get("/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
    .select('name surname _id userImage')
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc) {
            res.status(200).json({
                name: doc,
                request: {
                    type: 'GET',
                    url:'http://localhost:3838/users/' + doc._id //insert azure web app url when building!!!!
                }
            });
                
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

//post a new user within the DB
router.post("/",  checkAuth, upload.single('userImage'),  (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        userImage: req.file.path
    });
    user
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Created user successfully",
            createdUser: {
                name: result,name,
                surname: result.surname,
                _id: result._id,
                request: {
                    type: "GET",
                    url: "http://localhost:3838/users/" + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        }); 
    });
});

//Updates a specific user in the DB
router.patch('/:usersId',checkAuth, (req, res, next) => {
    const id = req.params.usersId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.userName] = ops.value;
    }
    User.update({ _id: id }, { $set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'User updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3838/users/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Removes a specific user within the DB
router.delete('/:usersId',checkAuth, (req, res, next) => {
    const id = req.params.usersId;
    User.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(202).json({
            message: "User Removed",
            request: {
                type: "POST",
                url: "http://localhost:3838/users/",
                data: {name: 'String', surname: 'Number'}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//export handling
module.exports = router;