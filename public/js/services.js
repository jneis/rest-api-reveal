(function() {

	angular

		.module("services", [])

		.factory("api", ["$http", function($http) {

			var hostname = "http://localhost:3000/rest-api-reveal/";

			var post = function(path, data, callback) {
				var url = hostname + path;
				
				$http
					.post(url, data)
					.success(callback)
					.error(function(info) {
						alert(info);
					});
			};

			var put = function(path, data, callback) {
				var url = hostname + path;
				
				$http
					.put(url, data)
					.success(callback)
					.error(function(info) {
						alert(info);
					});
			};

			var del = function(path, callback) {
				var url = hostname + path;
				
				$http
					.delete(url)
					.success(callback)
					.error(function(info) {
						alert(info);
					});
			};


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
				saveWadl: function(wadl, callback) {
					if (wadl._id !== undefined) {
						put("wadl/" + wadl.name, wadl, callback);
					} else {
						post("wadl", wadl, callback);
					};					
				},
				deleteWadl: function(name, callback) {
					del("wadl/" + name, callback);
				},
				listWadls: function(callback) {
					get("wadl", {}, callback);
				},
				getWadl: function(name, callback) {
					get("wadl/" + name, {}, callback)
				}
			};

		}])

})();