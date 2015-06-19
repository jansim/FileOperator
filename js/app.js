angular
.module('FileOperator', ['ngMaterial', 'ui.ace', 'holder', '$fs'])

// Set the application theme
// .config(function($mdThemingProvider) {
//   $mdThemingProvider.theme('default')
//     .primaryPalette('light-blue')
//     .accentPalette('orange');
// })

// MainPage Controller
.controller('MainCtrl', function($scope, $rootScope, $fs) {
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

	function aceChanged() {
		var userScope = new UserScope($scope.editorCode);
		if (userScope.valid) {
			// code excuted w/o errors
			var newUserFunction = userScope.getFunction('handleFilename');
			if (typeof newUserFunction != 'undefined') {
				// found a function
				$scope.validUserFunction = true;

				if (newUserFunction != window.userFunction) {
					window.userFunction = newUserFunction;
					$scope.safeApply();
				}
			} else $scope.validUserFunction = false; // function not found
		} else $scope.validUserFunction = false; // error in userCode
	}

	$scope.preview = function(input) {
		if ($scope.validUserFunction)
			return window.userFunction(input);
		else
			return "";
	};

	$scope.run = function() {
		if ($scope.validUserFunction) {
			var files = $scope.files;
			for (var i = 0; i < files.length; i++) {
				$fs.renameFile(files[i].name, window.userFunction(files[i].name), files[i].path);
			};
			$scope.clearFiles();
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