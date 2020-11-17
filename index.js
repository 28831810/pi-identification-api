var bodyParser = require('body-parser');
var express = require("express");

var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 3838;


const userRoutes = require('./routes/users');

app.use('/users', userRoutes)

// app.get("/users", (req, res, next) => {
//     res.status(200).json({
//         message: 'handle GET requests to /products'
//     })
// })


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