const express = require('express');
const { routes } = require('..');
const router = express.Router();


router.post('/', (req, res, next) => {
    const user = {
        name: req.body.name,
        surname: req.body.surname
    };
    res.status(201).json({
        message: 'handle POST requests to /users',
        createdUser: user
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    if(id == 'special'){
        res.status(200).json({
            message: 'you descovered special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'youre ID is',
        });
    }
})

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