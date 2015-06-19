angular.module('FileOperator')
.controller('ExecCtrl', function($scope, $rootScope, $fs, $code, $userFunc) {

	function resetCode() {
		// Dynamically load default code
		$code.get('exec').then(function(response) {
			// Success
			$scope.editorCode = response.data;
		}, function() {
			// Error
		});
	}
	resetCode();

	$rootScope.editorView = {
		title: 'Execute Command',
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
		if ($userFunc.setUserFunction($scope.editorCode, 'generateCommand')) {
			$scope.safeApply();
		}
		$rootScope.validUserFunction = $userFunc.validUserFunction;
	}

	var child_process = null;
	var execOptions = {
		encoding: 'utf8',
	}; // things like current working directory can be set here
	if (require) child_process = require('child_process');

	$userFunc.setWrapperFunction(function(userFunction, file, actualRun) {
		var cmd = userFunction(file.path || file.name);
		if (actualRun) {
			if (typeof cmd == 'string') {
				console.log("Executing: " + cmd);
				if (child_process) {
					// Execute the command asynchroniously as a child process
					// var child = child_process.exec(cmd, execOptions, function(error, stdout, stderr) {
					// 	console.log('stdout: ' + stdout);
					// 	console.log('stderr: ' + stderr);
					// 	if (error !== null) {
					// 		console.log('exec error: ' + error);
					// 	}
					// });

					var stdout = child_process.execSync(cmd, execOptions);
					console.log(stdout);
				}
			}
		} else return cmd;
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