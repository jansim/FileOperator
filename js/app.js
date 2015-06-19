angular
.module('FileOperator', ['ngMaterial', 'ngRoute', 'ui.ace', 'holder', '$fs', '$fileList', '$code'])

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
		templateUrl: 'templates/editor/rename.html',
	})
	.otherwise('/rename');
});