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

var parser = require('../services/parser.service');
var Wadl = require('mongoose').model('Wadl');

router.route('/:api/resource')

 	.get(function(request, response, next) {
 		Wadl.findByName(request.api, function(error, data) {
			if (error) {
				return next(error);
			} else {
				parser(data.url, function(resources) {
 					response.json(resources);
 				});
			};
		});
 	});	

router.param('resource', function(request, response, next, resource) {
	console.log("param handler: " + resource);
 	request.resource = resource;
 	next();
 });

var first = function(resources, name) {
	return resources.filter(function(resource) {
		return resource.name === name;
	});
};

router.route('/:api/resource/:resource')
	.get(function(request, response, next) {
		parser(function(resources) {
			response.json(first(resources, request.resource));
		});
	}); 	

module.exports = router;