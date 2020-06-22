module.exports = function() {
	this.create = function(type,...p){
		if (!this.createTypes[type]) {
			this.say("I don't know how to to create a", type, ".");
			return;
		}
		try {
			this.createTypes[type](this, ...p)
		} catch (e) {
			this.say(e)
		};
	}

	this.createTypes = {}
	var createTypeNames = this.fileman.getDirs("creatables")
	for (let i of createTypeNames) {
		console.log(`loading createType ${i}`);
		if (/[\\\/:*?"<>|]/.exec(i)) throw `${i} isn't a valid directory name`; // regex detects invalid characters
		this.createTypes[i] = this.require(`./creatables/${i}/`);
	}
}