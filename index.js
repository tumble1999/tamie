var tamie = {}

{
	console.log("Tamie v0.1 Created by Tumble")
	let plugins = require('./plugins/');

	for (let i of plugins) {
		console.log(`[plugins] loading plugin ${i}`);
		if (/[\\\/:*?"<>|]/.exec(i)) throw `${i} isn't a valid directory name`; // regex detects invalid characters

		var cl = console.log;
		console.log = function(...t) {
			cl(`[${i}]`,...t);
		}
		require(`./plugins/${i}/`).call(tamie);
		console.log = cl;
	}
	console.log(Object.keys(tamie));
}