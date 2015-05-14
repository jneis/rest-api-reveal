module.exports = function(wadl, callback) {
	var XmlParser = require("xml2object");
	var parser = new XmlParser(['resource']);
	var resources = [];

	parser.on('object', function(name, obj) {
		resources.push(obj);
	});

	var request = require('request');
	
	parser.on('end', function() {
		callback(resources);
	});
	request(wadl).pipe(parser.saxStream);
};