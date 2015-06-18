angular.module('holder', []).directive('holder', ['$window', function($window){
	return {
		restrict: 'AE',
		link: function(scope, element, attrs) {
			// prevent default behavior from changing page on dropped file
			window.ondragover = function(e) { e.preventDefault(); return false };
			window.ondrop = function(e) { e.preventDefault(); return false };

			scope.files = [];
			var fileIds = [];

			// clear all files from the array
			scope.clearFiles = function() {
				scope.files = [];
				fileIds = [];
			}

			scope.addFile = function(file) {
				console.log(file, file.name, file.path);
				var file_id = file.path || file.name;
				if (fileIds.indexOf(file_id) == -1) {
					scope.files.push(file);
					fileIds.push(file_id); // prevent duplicates
				}
			}

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
					scope.addFile(e.dataTransfer.files[i]);
				}
				scope.$apply();
				return false;
			});
		}
	}
}]);