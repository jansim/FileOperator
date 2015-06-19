angular.module('$fs', []).factory('$fs', [function(){
	var fs = null;
	var path = null;
	if (typeof require !== 'undefined') {
		// has node access
		fs = require('fs');
		path = require('path');
	}

	return {
		renamePath: function(oldPath, newPath) {
			if (fs) fs.renameSync(oldPath, newPath);
			else console.log("Renaming '" + oldPath + "' to '" + newPath + "'");
		},
		renameFile: function(oldName, newName, oldPath) {
			if (!path)
				console.log("Renaming '" + oldName + "' to '" + newName + "'");
			else {
				var newPath = path.dirname(oldPath) + '/' + newName;
				this.renamePath(oldPath, newPath);
			}
		},
		stat: function(path) {
			if (fs) {
				return fs.statSync(path);
			} else return null;
		},
		getFiles: function(path) {
			if (fs) {
				var filenames = fs.readdirSync(path);
				var files = [];
				for (var i = 0; i < filenames.length; i++) {
					files.push({
						name: filenames[i],
						path: path + '/' + filenames[i],
					});
				};
				return files;
			} else return null;
		}
	}
}]);