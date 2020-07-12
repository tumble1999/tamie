module.exports = {
	createBind: function(instance) {
		return (function(a,...p){
			return this[a].bind(this,...p);
		}).bind(instance)
	},
	validDir:function (dir) {
		// regex detects invalid characters
		if (/[\\\/:*?"<>|]/.exec(dir)) throw `${dir} isn't a valid directory name`;
	},
	
	createLogContext: function (name, cb) {
		var cl = console.log;
		console.log = function (...t) {
			cl(`[${name}]`, ...t);
		}
		cb()
		console.log = cl;
	},
	removeLastNewLine(text) {
		return String(text).replace(/(\n|\r)+$/, "");
	}
}