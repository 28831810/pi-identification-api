var bodyParser = require('body-parser');
var express = require("express");
const mongoose = require('mongoose');
const morgan = require('morgan');
var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 3838;

const MONGODB_URI = 'mongodb+srv://studentAdmin:admin@word1@pi-identification-clust.iktww.mongodb.net/pi-identification-api-db?retryWrites=true&w=majority'

//route configs
const userRoutes = require('./routes/users');
const usersInfoRoutes = require('./routes/usersInfo');
const usersLoginRoutes = require('./routes/usersLogin');
//End of route configs


//connect to mongoDB 
mongoose.connect(MONGODB_URI || 'mongodb://localhost/project2_db_con',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () =>{
    console.log('Mongoose is connected!!!!!')
});
mongoose.Promise = global.Promise;
//Endo of connection

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//set headers for api access
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

//Routing configs
app.use('/users', userRoutes);
app.use('/usersInfo', usersInfoRoutes);
app.use('/usersLogin', usersLoginRoutes);
//Routing configs

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
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