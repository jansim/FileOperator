angular.module('holder', []).directive('holder', ['$window', function($window){
	return {
		restrict: 'AE',
		link: function(scope, element, attrs) {
			// prevent default behavior from changing page on dropped file
			window.ondragover = function(e) { e.preventDefault(); return false };
			window.ondrop = function(e) { e.preventDefault(); return false };

			scope.files = [];

			element.on('dragover', function () {
				angular.element(this).addClass('file-hover');
				return false;
			});
			element.on('dragleave', function () {
				angular.element(this).removeClass('file-hover');
				return false;
			});
			element.on('drop', function (e) {
				e.preventDefault();
				angular.element(this).removeClass('file-hover');
				for (var i = 0; i < e.dataTransfer.files.length; ++i) {
					console.log(e.dataTransfer.files[i].name, e.dataTransfer.files[i].path);
					if (scope.files.indexOf(e.dataTransfer.files[i]) == -1)
						scope.files.push(e.dataTransfer.files[i]);
				}
				scope.$apply();
				return false;
			});
		}
	}
}]);