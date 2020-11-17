var bodyParser = require('body-parser');
var express = require("express");

var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 3838;

// const morgan = require('morgan');

const userRoutes = require('./routes/users');
const infoRoutes = require('./routes/info');

//logger
// var logger = require('morgan');

// app.use(logger('common', {
//     stream: fs.createWriteStream('./access.log', {flags: 'a'})
// }));
// app.use(logger('dev'));

//logger

app.use('/users', userRoutes)
app.use('/info', infoRoutes)


app.post("/test", function(request, response)
{
    response.json({ "hell please work" : "yeah it works POST request" });
});

//Start the server

app.listen(port, function ()
{
    console.log("API server running " + "(Started " + new Date() + ")");
});

module.exports = app;