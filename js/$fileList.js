angular.module('$fileList', []).factory('$fileList', function ($fs) {
	var fileIds = [];
	return {
		files: [],
		// clear all files from the array
		clearFiles: function() {
			this.files.length = 0;
			fileIds.length = 0;
		},
		removeFile: function(index) {
			this.files.pop(index);
			fileIds.pop(index);
		},
		addFile: function(file) {
			console.log(file, file.name, file.path);

			if (file.path) {
				var stat = $fs.stat(file.path);
				if (stat && stat.isDirectory()) {
					var directoryFiles = $fs.getFiles(file.path);
					for (var i = 0; i < directoryFiles.length; ++i) {
						this.addFile(directoryFiles[i]);
					}
					return;
				}
			}

			var file_id = file.path || file.name;
			if (fileIds.indexOf(file_id) == -1) {
				this.files.push(file);
				fileIds.push(file_id); // prevent duplicates
			}
		}
	}
});