(function() {

	angular

		.module('resourceCtrl', ['resourceSrv'])

		.controller('resourceCtrl', ['$routeParams', '$scope', 'resourceSrv',

			function($routeParams, $scope, resourceSrv) {

				$scope.wadl = $routeParams.wadl;
				$scope.active = undefined;
				
				$scope.resources = [{name: 'idMapping'}, {name: 'synonyms'}, {name: 'search'}];
				//resourceSrv.listResources(function(resources) {
				//	$scope.resources = resources;
				//});

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