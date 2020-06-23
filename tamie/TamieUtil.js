module.exports = {
	createBind: function(instance) {
		return (function(a){
			this[a].bind(this,...p);
		}).bind(instance)
	}
}