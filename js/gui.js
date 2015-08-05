(function() {
	// execute this only if node.js is available
	if (typeof require === 'undefined') return;

	var gui = require('nw.gui');
	var win = gui.Window.get();
	var nativeMenuBar = new gui.Menu({type: "menubar"});

	nativeMenuBar.createMacBuiltin("File Operator");
	win.menu = nativeMenuBar;
})();