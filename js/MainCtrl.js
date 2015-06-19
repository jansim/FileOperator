angular.module('FileOperator')
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
});