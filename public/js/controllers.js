(function() {

	angular

		.module("controllers", [])

		.controller("wadlCtrl", ["$scope", "api", function($scope, api) {

			$scope.active = undefined;
			$scope.formVisible = false;
			
			api.listWadls(function(wadls) {
				$scope.wadls = wadls;
			});

			var select = function(wadl) {
				if ($scope.formVisible) {
					if (confirm("Discard?")) {
						$scope.active = wadl;
						$scope.clear();
					}					
				} else {
					$scope.active = wadl;
				}
			}

			var unselectWadl = function() {
				$scope.active = undefined;
			};

			$scope.selected = function(wadl) {
				return $scope.active === wadl;
			};

			$scope.toggle = function(wadl) {
				if ($scope.selected(wadl)) {
					unselectWadl();
				} else {
					select(wadl);
				};
			};

			$scope.showForm = function() {
				$scope.formVisible = true;
			};

			$scope.clear = function() {
				$scope.formVisible = false;
				unselectWadl();
			};

			$scope.save = function() {
				api.saveWadl($scope.active, function(wadl) {
					if (!$scope.edition()) {
						$scope.wadls.push(wadl);
					}					
					$scope.clear();
				});				
			};

			$scope.delete = function() {
				var wadl = $scope.active.name;

				api.deleteWadl(wadl, function() {
					$scope.wadls.splice($scope.wadls.indexOf(wadl), 1);
					$scope.clear();
				});
			};

			$scope.filled = function(value) {
				return value !== undefined && value !== "";
			};

			$scope.edition = function() {
				return $scope.active !== undefined && $scope.active._id !== undefined;
			};
		}]);

})();