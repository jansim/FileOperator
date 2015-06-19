angular.module('$userFunc', []).factory('$userFunc', function(){

	var userFunction;
	var wrapperFunction;

	function UserScope(body) {
		// Specify some functions or variables in here if you want,
		// that will be available to all functions declared in here
		// or just add them afterwards

		try {
			eval(body);
			this.valid = true;
		} catch(e) {
			this.valid = false;
		}

		// Get the reference to a function inside the scope
		this.getFunction = function(functionName) {
			try {
				return eval(functionName);
			} catch(e) {
				return undefined;
			}
		}
	}

	return {
		setUserFunction: function(body, name) {
			var userScope = new UserScope(body);
			if (userScope.valid) {
				// code excuted w/o errors
				var newUserFunction = userScope.getFunction(name);
				if (typeof newUserFunction != 'undefined') {
					// found a function
					this.validUserFunction = true;

					if (newUserFunction != userFunction) {
						userFunction = newUserFunction;
						return true;
					}
				} else this.validUserFunction = false; // function not found
			} else this.validUserFunction = false; // error in userCode
			return false;
		},
		setWrapperFunction: function(newWrapperFunction) {
			wrapperFunction = newWrapperFunction;
		},
		callWrapperFunction: function(file) {
			return wrapperFunction(userFunction, file, true);
		},
		previewWrapperFunction: function(file) {
			return wrapperFunction(userFunction, file, false);
		},
		validUserFunction: false,
	};
});

