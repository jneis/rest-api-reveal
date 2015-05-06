(function() {

	angular

		.module("restApiReveal", [
			"ngRoute",
			"wadlSrv",
			"wadlCtrl"
		])

		.config(function($routeProvider) {
			
			$routeProvider

				.when("/", {
					templateUrl: "html/start.html"
				})

				.when("/wadl", {
					templateUrl: "html/wadl.html",
					controller: "wadlCtrl"
				})

				.otherwise({
					redirectTo: "/"
				});
		});

})();