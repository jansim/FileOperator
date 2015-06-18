angular
.module('FileOperator', ['ngMaterial', 'ui.ace', 'holder'])

// Set the application theme
// .config(function($mdThemingProvider) {
//   $mdThemingProvider.theme('default')
//     .primaryPalette('light-blue')
//     .accentPalette('orange');
// })

// MainPage Controller
.controller('MainCtrl', function($scope, $rootScope) {
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
			window.validUserFunction = true;
		} catch(e) {
			window.validUserFunction = false;
		}
	}

	$scope.preview = function(input) {
		if (window.validUserFunction)
			return window.userFunction(input);
		else
			return "";
	};

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