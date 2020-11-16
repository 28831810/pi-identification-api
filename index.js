var bodyParser = require('body-parser');
var express = require("express");

var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 3838;

app.get("/test", function(request, response)
{
    response.json({ "hell" : "yeah" });
});

//Start the server
app.listen(port, function ()
{
    console.log("API server running " + "(Started " + new Date() + ")");
});