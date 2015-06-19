angular.module('FileOperator')
// MainPage Controller
.controller('MainCtrl', function($scope, $rootScope, $fs, $userFunc, $fileList, $location) {
	// Safe Apply Function
	// Only gets called when outside of digest cycle (use this only for functions which can be called by either angular or regular js)
	$rootScope.safeApply = function(fn) {
		var phase = this.$root.$$phase;
		if(phase == '$apply' || phase == '$digest') {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		} else {
			this.$apply(fn);
		}
	};

	$rootScope.run = function() {
		if ($scope.validUserFunction) {
			var files = $fileList.files;
			for (var i = 0; i < files.length; i++) {
				$userFunc.callWrapperFunction(files[i]);
			};
			$fileList.clearFiles();
		}
	}

	$rootScope.preview = function(file) {
		if ($scope.validUserFunction)
			return $userFunc.previewWrapperFunction(file);
		else
			return null;
	};

	$scope.editorModes = [
		{
			id: 'rename',
			title: 'Rename Files',
		},
		{
			id: 'move',
			title: 'Move Files',
		},
		{
			id: 'exec',
			title: 'Execute Command',
		},
	];
	$scope.changeMode = function(id) {
		$location.url('/' + id);
	};
});