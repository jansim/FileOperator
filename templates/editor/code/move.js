/**
 * Gets executed for every file and moves the file to the
 * newly specified path.
 * Return false or the current path if this file should not be moved.
 *
 * !! atm. directories are not made, so they need to exist already !!
 * @param  {[type]} directory The path to the current directory of the file.
 * @param  {[type]} name      The name of the file.
 * @return {[type]}           The new destination path for the file.
 */
function generateNewFilepath(directory, name) {
	return directory + name;
}