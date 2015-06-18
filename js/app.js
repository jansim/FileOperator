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
		var extraFunctionBody = "\nreturn handleFilename(_filename);";
		try {
			var newUserFunction = new Function('_filename', $scope.editorCode + extraFunctionBody);
			if (newUserFunction != window.userFunction) {
				var oldUserFunction = window.userFunction;
				window.userFunction = newUserFunction;

				$scope.safeApply();
			}
			$scope.validUserFunction = true;
		} catch(e) {
			$scope.validUserFunction = false;
		}
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