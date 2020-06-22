module.exports = function() {
	this.require = function(p) {
		return require.main.require(p);
	}
	this.bind = function(a,...p) {
		return this[a].bind(this,...p);
	}
	this.say = function(...t) {
		console.log(...t)
	}
	this.basicCallback = function(...t) {
		this.say(...t);
	}
}