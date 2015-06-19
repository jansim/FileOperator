angular.module('FileOperator')
.controller('FileViewCtrl', function($scope, $rootScope, $fileList) {
	$rootScope.files = $fileList.files;

	$rootScope.fileView = {
		title: 'Files',
		menu: [
			{
				action: function() {
					$fileList.clearFiles();
				},
				title: 'Clear'
			}
		]
	};

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