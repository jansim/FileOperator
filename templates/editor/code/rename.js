/**
 * Gets executed for every file and renames the file to the new name.
 * Return false or the current path if this file should not be moved.
 * @param  {string} name      The old filename without extension.
 * @param  {string} extension The extension of the file.
 * @return {string}           The new filename WITH extension.
 */
function generateNewFilename(name, extension) {
	return name + '.' + extension;
}