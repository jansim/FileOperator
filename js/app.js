angular
.module('FileOperator', ['ngMaterial', 'ngRoute', 'ui.ace', 'holder', '$fs', '$fileList', '$code', '$userFunc'])

// Set the application theme
// .config(function($mdThemingProvider) {
//   $mdThemingProvider.theme('default')
//     .primaryPalette('light-blue')
//     .accentPalette('orange');
// })

.config(function($routeProvider) {
	$routeProvider
	.when('/rename', {
		controller: 'RenameCtrl',
		templateUrl: 'templates/editor/editor.html',
	})
	.when('/move', {
		controller: 'MoveCtrl',
		templateUrl: 'templates/editor/editor.html',
	})
	.when('/exec', {
		controller: 'ExecCtrl',
		templateUrl: 'templates/editor/editor.html',
	})
	.otherwise('/rename');
});