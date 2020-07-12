const { TamieFolder, TamieFile } = require("./TamieFiles");
const TamieEventHandler = require("./TamieEventHandler");
const TamieUtil = require("./TamieUtil");

var TamieConfig = new TamieFolder("config");

var TamieOldPlugins = new TamieFolder("plugins-old");
var TamiePlugins = new TamieFolder("plugins");

var TamieInputEvents = new TamieEventHandler();
var TamieProcessEvents = new TamieEventHandler();
var TamieOutputEvents = new TamieEventHandler();

var TamieOldContext = {};

console.log("Tamie v0.2 Created by Tumble")

class Tamie {
	constructor() {
		console.log("Starting new System");
		this.config = TamieConfig.getFile("tamie.json");
	}

	async setup() {
		if (await this.config.jsonEmpty()) {
			await this.config.setText("{}")
			await this.config.setJson({
				"plugins-old": [
					"vanilla",
					"fileman",
					"progman",
					"commands"
				],
				"plugins": []
			})
		}
		await this.loadOldPlugins();
		this.loadPlugins();
	}

	async getPlugins() {
		return (await this.config.getJson()).plugins || [];
	}

	async getOldPlugins() {
		return (await this.config.getJson())["plugins-old"] || [];
	}

	async loadPlugins() {
		console.log("Loading Plugins");
		var plugins = await this.getPlugins();
		for (var i of plugins) {
			console.log("[plugins] loading plugin", i);
			TamieUtil.validDir(i);
			TamieUtil.createLogContext(i, function () {
				TamiePlugins.require(i)({
					TamieInputEvents,
					TamieProcessEvents,
					TamieOutputEvents,
					TamieConfig:()=>TamieConfig.getFile(i+".json"),
					TamieUtil,
					TamieFile,
					TamieFolder,
					TamieOldContext
				})
			})
		}
		console.log(TamieInputEvents._events)
		console.log(TamieOutputEvents._events)
	}

	async loadOldPlugins() {
		console.log("Loading Old Plugins");
		var plugins = await this.getOldPlugins();
		var tamie = TamieOldContext;

		for (let i of plugins) {
			console.log(`[plugins-old] loading plugin ${i}`);
			TamieUtil.validDir(i);
			TamieUtil.createLogContext(i, function () {
				TamieOldPlugins.require(i).call(tamie);
			});
		}
		console.log(tamie);
		Object.seal(tamie);
	}
}
module.exports = Tamie;