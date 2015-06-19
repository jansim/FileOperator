angular.module('FileOperator')
.controller('FileViewCtrl', function($scope, $rootScope, $fileList) {
	$rootScope.files = $fileList.files;

	$scope.preview = function(input) {
		if ($scope.validUserFunction)
			return window.userFunction(input);
		else
			return null;
	};

	$scope.previewAvailable = function(path) {
		return $scope.validUserFunction;
	}
});