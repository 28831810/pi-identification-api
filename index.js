var bodyParser = require('body-parser');
var express = require("express");
const mongoose = require('mongoose');
var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 3838;

const MONGODB_URI = 'mongodb+srv://studentAdmin:admin@word1@pi-identification-clust.iktww.mongodb.net/pi-identification-api-db?retryWrites=true&w=majority'

//route configs
const userRoutes = require('./routes/users');
const infoRoutes = require('./routes/info');
//End of route configs


//connect to mongoDB 
mongoose.connect(MONGODB_URI || 'mongodb://localhost/project2_db_con',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () =>{
    console.log('Mongoose is connected!!!!!')
});
//Endo of connection

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