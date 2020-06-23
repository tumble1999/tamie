const readline = require('readline');

module.exports = function () {

	this.tell = function (t) {
		t = t.split(" ");
		var c = t.shift()
		if (!this.commands[c]) {
			this.say("I don't how to", c);
			return;
		}
		try {
			this.commands[c](this, ...t)
		} catch (e) {
			this.say(e)
		};
	}

	this.ears = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: false
	});
	this.commands = {}
	this.ears.on("line", this.bind("tell"));
	var commandNames = this.fileman.getDirs("commands");
	for (let i of commandNames) {
		console.log(`loading command ${i}`);
		if (/[\\\/:*?"<>|]/.exec(i)) throw `${i} isn't a valid directory name`; // regex detects invalid characters
		this.commands[i] = this.require(`./commands/${i}/`);
	}

}