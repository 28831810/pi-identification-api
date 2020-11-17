var bodyParser = require('body-parser');
var express = require("express");

var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 3838;

const mongoose = require('mongoose');

//route configs
const userRoutes = require('./routes/users');
const infoRoutes = require('./routes/info');
//End of route configs

mongoose.connect(
    "mongodb+srv://studentAdmin:"+ 
    process.env.MONGO_ATLAS_PW +
    "@pi-identification-clust.iktww.mongodb.net/pi-identification-api-db?retryWrites=true&w=majority", {
        useMongoClient: true
    });

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://studentAdmin:admin%40word1%0A@pi-identification-clust.iktww.mongodb.net/pi-identification-api-db?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useUnifiedTopology: true });
// console.log("It works");
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log("It does not works");
//   // perform actions on the collection object
//   client.close();
// });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
//error handling
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
//end of error handling

// //Start the server
{
    app.listen(port, function ()
    {
        console.log("APdI server running " + "(Started " + new Date() + ")");
    });
}

module.exports = app;