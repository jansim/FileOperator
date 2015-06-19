angular.module('FileOperator')
.controller('RenameCtrl', function($scope, $rootScope, $fs, $fileList) {

	function aceChanged() {
		var userScope = new UserScope($scope.editorCode);
		if (userScope.valid) {
			// code excuted w/o errors
			var newUserFunction = userScope.getFunction('handleFilename');
			if (typeof newUserFunction != 'undefined') {
				// found a function
				$rootScope.validUserFunction = true;

				if (newUserFunction != window.userFunction) {
					window.userFunction = newUserFunction;
					$scope.safeApply();
				}
			} else $rootScope.validUserFunction = false; // function not found
		} else $rootScope.validUserFunction = false; // error in userCode
	}

	$rootScope.run = function() {
		if ($scope.validUserFunction) {
			var files = $fileList.files;
			for (var i = 0; i < files.length; i++) {
				$fs.renameFile(files[i].name, window.userFunction(files[i].name), files[i].path);
			};
			$fileList.clearFiles();
		}
	}

	$scope.aceOptions = {
		// useWrapMode : true,
		// showGutter: false,
		mode: 'javascript',
		showPrintMargin: false,
		// onLoad: aceLoaded,
		onChange: aceChanged
	};
	$scope.editorCode = "function handleFilename(filename) {\n\t\n\treturn filename;\n}";
});