var childProcess = require('child_process');

module.exports = function() {
	this.progman = {
		run: function(exe,...args) {
			childProcess.execFile(exe,args)
		}
	}
}