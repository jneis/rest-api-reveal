(function() {

	angular

		.module('resourceCtrl', ['resourceSrv', 'ngRoute'])

		.controller('resourceCtrl', ['$routeParams', '$scope', 'resourceSrv',

			function($routeParams, $scope, resourceSrv) {

				$scope.wadl = $routeParams.wadl;
				$scope.active = undefined;
				$scope.resources = [];
				
				var dropParams = function(path) {
					var temp = path;			
					while (temp.includes('{')) {
						var start = temp.indexOf('/{');
						var end = temp.indexOf('}');		
						temp = temp.slice(0, start) + temp.slice(end + 1);
					};
					return temp;
				};

				resourceSrv.listResources($scope.wadl, function(resources) {
					resources.forEach(function(resource) {
						var path = dropParams(resource.path);
						var name = path.replace(/\//g, '-');
						$scope.resources.push(name);
					});
					//console.log($scope.resources);
				});

				var select = function(resource) {
					$scope.active = resource;
				}

				var unselectResource = function() {
					$scope.active = undefined;
				};

				$scope.selected = function(resource) {
					return $scope.active === resource;
				};

				$scope.toggle = function(resource) {
					if ($scope.selected(resource)) {
						unselectResource();
					} else {
						select(resource);
					};
				};

				//$scope.clear = function() {
				//	unselectWadl();
				//};
				
		}]);

})();