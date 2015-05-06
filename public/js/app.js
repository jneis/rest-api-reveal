(function() {

	angular

		.module('restApiReveal', [
			'ngRoute',
			'wadlSrv',
			'resourceSrv',
			'wadlCtrl',
			'resourceCtrl'
		])

		.config(function($routeProvider) {
			
			$routeProvider

				.when('/', {
					templateUrl: 'html/start.html'
				})

				.when('/wadl', {
					templateUrl: 'html/wadl.html',
					controller: 'wadlCtrl'
				})

				.when('/wadl/:name', {
					templateUrl: 'html/resource.html',
					controller: 'resourceCtrl'
				})

				.otherwise({
					redirectTo: '/'
				});
		});

})();