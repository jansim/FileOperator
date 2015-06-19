angular.module('$code', []).factory('$code', function ($http) {
	var folder = "templates/editor/code/";
	var type = ".js";
	return {
		get: function(name) {
			return $http({
				method: 'GET',
				url: folder + name + type,
			});
		}
	}
});