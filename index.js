var bodyParser = require('body-parser');
var express = require("express");

var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 3838;

// const morgan = require('morgan');

const userRoutes = require('./routes/users');
const infoRoutes = require('./routes/info');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/users', userRoutes)
app.use('/info', infoRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// //Start the server
{
    app.listen(port, function ()
    {
        console.log("APdI server running " + "(Started " + new Date() + ")");
    });
}

module.exports = app;