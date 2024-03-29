'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var socketIo = require('./utils/socket.io');


var config = require('./config.json');
var port = config.port;

mongoose.connect(config.dbURL, { useNewUrlParser: true })

var app = express();

app.use(express.static('../client/public'));


//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

//Routes
app.use('/auth', require('./routes/user.route'));
app.use('/article', require('./routes/article.route'));

app.get(['/', '/index'], function (request, response, next) {
    response.sendFile(path.resolve('../client/public/index.html'));
})



//Start
var server = app.listen(port);
console.log("server ready on port " + port);

var io = require('socket.io').listen(server);

socketIo.createSocket(io);
