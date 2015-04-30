var mongoose = require('./app/mongoose');
var db = mongoose();
var express = require('express');
var app = express();

var parser = require('body-parser');
app.use(parser.json());

var wadl = require('./app/routes/wadl-route');
app.use('/rest-api-reveal/wadl', wadl);

app.use(express.static(__dirname + '/public'));

app.listen(3000, function() {
	console.log('Listening on 3000');
});