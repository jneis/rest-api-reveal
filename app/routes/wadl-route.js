var express = require('express');
var router = express.Router();

var wadl = require('../controllers/wadl-controller');

 router.route('/')

 	.get(function(request, response, next) {
 		wadl.list(request, response, next);
 	})

 	.post(function(request, response, next) {
 		request.wadl = request.body;
 		wadl.create(request, response, next);
 	});

 router.param('api', function(request, response, next, api) {
 	request.api = api;
 	next();
 });

router.route('/:api')

	.put(function(request, response, next) {
		request.wadl = request.body;
		request.wadl.name = request.api;
		wadl.update(request, response, next);
	})

	.delete(function(request, response, next) {
		wadl.delete(request, response, next);
	})

	.get(function(request, response, next) {
		wadl.find(request, response, next)
	});

module.exports = router;