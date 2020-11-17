const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handle GET requests to /users'
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'handle POST requests to /users'
    })
})

router.get('/:userId', (req, res, next) => {
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message: 'you descovered special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'youre ID is',
            id: id
        });
    }
})