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
				var newPath = path.dirname(oldPath) + newName;
				this.renamePath(oldPath, newPath);
			}
		}
	}
}]);