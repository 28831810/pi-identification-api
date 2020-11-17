var bodyParser = require('body-parser');
var express = require("express");

var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 3838;

// const mongoose = require('mongoose');


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://studentAdmin:admin@word1@pi-identification-clust.iktww.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// app.post('/users', (req, res, next) => {
//     const user = {
//         name: req.body.name,
//         surname: req.body.surname
//     }
//     res.status(201).json({
//         message: 'Handling post request to /user',
//         createUser: user
//     })
// })

app.get("/test", function(request, response)
{
    response.json({ "hell please work" : "yeah it works" });
});

//Start the server
app.listen(port, function ()
{
    console.log("API server running " + "(Started " + new Date() + ")");
});