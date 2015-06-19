/**
 * Generate a command to be executed for the current file.
 * Return false if nothing should be executed for this file.
 * @param  {string} path The current path of the file.
 * @return {string}      The command to be executed.
 */
function generateCommand(path) {
	return "stat " + '"' + path + '"';
}