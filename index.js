var bodyParser = require('body-parser');
var express = require("express");

var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 3838;

// const morgan = require('morgan');

const userRoutes = require('./routes/users');
const infoRoutes = require('./routes/info');

app.use('/users', userRoutes)
app.use('/info', infoRoutes)


// //Start the server
{
    app.listen(port, function ()
    {
        console.log("APdI server running " + "(Started " + new Date() + ")");
    });
}

module.exports = app;