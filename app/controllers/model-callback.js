module.exports.save = function(response, next, data) {
	return function(error) {
		if (error) {
			return next(error);
		} else {
			response.json(data);
		};
	};
};

module.exports.find = function(response, next) {
	return function(error, data) {
		if (error) {
			return next(error);
		} else {
			response.json(data);
		};
	};
};