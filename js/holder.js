angular.module('holder', ['$fileList']).directive('holder', ['$fileList', function($fileList){
	return {
		restrict: 'AE',
		link: function(scope, element, attrs) {
			// prevent default behavior from changing page on dropped file
			window.ondragover = function(e) { e.preventDefault(); return false };
			window.ondrop = function(e) { e.preventDefault(); return false };

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
					$fileList.addFile(e.dataTransfer.files[i]);
				}
				scope.$apply();
				return false;
			});
		}
	}
}]);