(function() {

	angular

		.module('resourceSrv', [])

		.factory('resourceSrv', ['$http', function($http) {

			var hostname = 'http://localhost:3000/rest-api-reveal/';

			var get = function(path, args, callback) {
				var url = hostname + path;
				var config = {
					params: args,
					cache: true
				};

				$http
					.get(url, config)
					.success(callback)
					.error(function(info) {
						alert(info);
					})
			};

			return {
				listResources: function(wadl, callback) {
					get('wadl/' + wadl + '/resource', {}, callback);
				},
				getWadl: function(wadl, name, callback) {
					console.log("wadl: " + wadl + " resource: " + name);
					get('wadl/' + wadl + '/resource/' + name, {}, callback)
				}
			};

		}])

})();