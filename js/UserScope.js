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