angular.module('FileOperator')
.controller('RenameCtrl', function($scope, $rootScope, $fs, $code, $userFunc) {

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
		title: 'Rename Files',
		menu: [
			{
				action: function() {
					resetCode();
				},
				title: 'Reset'
			}
		]
	};
	$rootScope.previewEnabled = true;

	function onEditorChange() {
		if ($userFunc.setUserFunction($scope.editorCode, 'generateNewFilename')) {
			$scope.safeApply();
		}
		$rootScope.validUserFunction = $userFunc.validUserFunction;
	}

	$userFunc.setWrapperFunction(function(userFunction, file, actualRun) {
		var name = file.name;
		var parts = name.split('.');
		var extension = '';
		if (parts.length > 1) {
			extension = parts.pop();
			if (parts.length == 1) name = parts[0];
			else name = name.substr(0, name.length - (extension.length + 1));
		}
		var newName = userFunction(name, extension);
		if (actualRun) {
			if (typeof newName == 'string') $fs.renameFile(file.name, newName, file.path);
		} else {
			return newName;
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