angular.module('FileOperator')
.controller('FileViewCtrl', function($scope, $rootScope, $fileList, $userFunc) {
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

	$scope.removeFile = $fileList.removeFile;

	$scope.previewAvailable = function(path) {
		return $scope.validUserFunction;
	}
});