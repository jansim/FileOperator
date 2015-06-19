angular.module('FileOperator')
.controller('RenameCtrl', function($scope, $rootScope, $fs, $fileList, $code, $userFunc) {

	function resetCode() {
		// Dynamically load default code
		$code.get('rename').then(function(response) {
			// Success
			$scope.editorCode = response.data;
		}, function() {
			// Error
		});
	}
	resetCode();

	$rootScope.editorView = {
		title: 'Code',
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
		if ($userFunc.setUserFunction($scope.editorCode, 'handleFilename')) {
			$scope.safeApply();
		}
		$rootScope.validUserFunction = $userFunc.validUserFunction;
	}

	$userFunc.setWrapperFunction(function(userFunction, file, actualRun) {
		if (actualRun) {
			$fs.renameFile(file.name, userFunction(file.name), file.path);
		} else {
			return userFunction(file.name);
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