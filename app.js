//importing modules

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');

var path = require('path'); //Code module so don't need to install.

var app = express();

const route = require('./routes/route');

//Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/contactlist');


//On Connection Success
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017');
});

//On Connection Errors
mongoose.connection.on('error',(err) => {
    if(err)
    {
        console.log('Error connecting to database mongodb' + err);
    }
});

///port number
const port = 3000;

//Adding middleware - cors
app.use(cors());

//body Parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public'))); // you can also give the actual path

//Adding routes
app.use('/api', route);

//testing Server
app.get('/',(req,res)=> {
    res.send('foobar');
});


app.listen(port, () =>{
    console.log("Server Started at port" + port);
});