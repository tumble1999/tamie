const { TamieFolder } = require("./TamieFiles")
console.log("Tamie v0.2 Created by Tumble")

var TamieConfig = new TamieFolder("config");
var TamieOldPlugins = new TamieFolder("plugins-old");

class Tamie {
	constructor() {
		console.log("Starting new System");
		this.config = TamieConfig.getFile("tamie.json");
		this.oldPluginContext = {};
	}

	async setup() {
		await this.loadOldPlugins();
		if(Object.keys(await this.config.getJson()).length==0) {
			await this.config.setText("{}")
			await this.config.setJson({
				"plugins-old":[
					"vanilla",
					"fileman",
					"progman",
					"commands"
				],
				"plugins":[]
			})
		}

	}

	async loadOldPlugins() {
		console.log("Loading Old Plugins");
		var plugins = await this.getOldPlugins();
		var tamie = this.oldPluginContext;
	
		for (let i of plugins) {
			console.log(`[plugins] loading plugin ${i}`);
			if (/[\\\/:*?"<>|]/.exec(i)) throw `${i} isn't a valid directory name`; // regex detects invalid characters
	
			var cl = console.log;
			console.log = function(...t) {
				cl(`[${i}]`,...t);
			}
			TamieOldPlugins.require(i).call(tamie);
			console.log = cl;
		}
		console.log(Object.keys(tamie));
	}

	async getPlugins() {
		return (await this.config.getJson()).plugins||[];
	}

	async getOldPlugins() {
		return (await this.config.getJson())["plugins-old"]||[];
	}
}
var tamie = new Tamie();
tamie.setup();