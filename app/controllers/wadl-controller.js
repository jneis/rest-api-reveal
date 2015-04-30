var Wadl = require('mongoose').model('Wadl');
var callback = require('./model-callback');

exports.list = function(request, response, next) {
	Wadl.find({}, callback.find(response, next));
};

exports.create = function(request, response, next) {
	var wadl = new Wadl(request.wadl);
	wadl.save(wadl, callback.save(response, next, wadl));
};

exports.update = function(request, response, next) {
	Wadl.updateByName(request.wadl, callback.find(response, next));
};

exports.find = function(request, response, next) {
	Wadl.findByName(request.api, callback.find(response, next));
};

exports.delete = function(request, response, next) {
	Wadl.removeByName(request.api, callback.find(response, next));
};