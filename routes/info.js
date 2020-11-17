const express = require('express');
const { routes } = require('..');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'More info was retrieved'
    });
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'More indo was created'
    });
})

router.get('/:infoId', (req, res, next) => {
    res.status(200).json({
        message: 'more info',
        infoId: req.params.infoId
    });
})

router.delete('/:infoId', (req, res, next) => {
    res.status(200).json({
        message: 'info was deleted',
        infoId: req.params.infoId
    });
})

module.exports = router;