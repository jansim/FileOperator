angular.module('FileOperator')
.controller('MoveCtrl', function($scope, $rootScope, $fs, $code, $userFunc) {

	function resetCode() {
		// Dynamically load default code
		$code.get('move').then(function(response) {
			// Success
			$scope.editorCode = response.data;
		}, function() {
			// Error
		});
	}
	resetCode();

	$rootScope.editorView = {
		title: 'Move Files',
		menu: [
			{
				action: function() {
					resetCode();
				},
				title: 'Reset'
			}
		]
	};

	function onEditorChange() {
		if ($userFunc.setUserFunction($scope.editorCode, 'generateNewFilepath')) {
			$scope.safeApply();
		}
		$rootScope.validUserFunction = $userFunc.validUserFunction;
	}

	$userFunc.setWrapperFunction(function(userFunction, file, actualRun) {
		var newPath = userFunction(file.path);
		if (actualRun) {
			if (typeof newPath == 'string') $fs.renamePath(file.path, newPath);
		} else {
			return userFunction(file.path);
		}
	});

	$scope.aceOptions = {
		// useWrapMode : true,
		// showGutter: false,
		mode: 'javascript',
		showPrintMargin: false,
		// onLoad: aceLoaded,
		onChange: onEditorChange
	};
});