const path = require('path'),
		fs = require('fs');
const rootDir = path.dirname(require.main.filename);


var TamieFileUtil = {
	exists: async function (file) {
		return new Promise((resolve, reject) => {
			fs.exists(file, resolve);
		});
	},
	rename: async function (file, newName) {
		return new Promise((resolve, reject) => {
			fs.rename(file, newName, resolve);
		});
	},
	symlink: async function (file, dest) {
		return new Promise((resolve, reject) => {
			fs.symlink(file, dest, resolve);
		});
	},
	unlink: async (file)=> {
		return new Promise((resolve, reject) => {
			fs.unlink(file, resolve);
		});
	}
};


class TamieFile {
	constructor(file) {
		this.path = path.join(rootDir,file);
		TamieFileUtil.exists(this.path).then(exists=>{
			if(!exists){
				var stream = this.getWriteStream();
				stream.on("open",function (){
					stream.close();
				})
			}
		})
		console.log("Creating file",this.path)

	}

	getReadStream() {
		console.log("Creating read stream for ",this.path)
		return fs.createReadStream(this.path);
	}

	getWriteStream() {
		console.log("Creating write stream for ",this.path)
		return fs.createWriteStream(this.path);
	}
	
	async getText() {
		var file = this.path;
		return new Promise((resolve, reject) => {
			fs.readFile(file, function (error, data) {
				if (error) {
					reject(error);
					return;
				}
				resolve(data);
			});
		});
	}
	async setText(text) {
		var file = this.path;
		return new Promise((resolve, reject) => {
			fs.writeFile(file, text, function (error) {
				if (error) {
					reject(error);
					return;
				}
				resolve();
			});
		});
	}
	async stats() {
		var file = this.path;
		return new Promise((resolve, reject) => {
			fs.stat(file, resolve);
		});
	}
	async chown(uid, gid) {
		var file = this.path;
		return new Promise((resolve, reject) => {
			fs.chown(file, uid, gid, resolve);
		});
	}

	async getJson() {
		var data = await this.getText(this.path);
		return JSON.parse(data.toString()||"{}");

	}

	async setJson(data) {
		var text = JSON.stringify(data,null,2);
		return await this.setText(text);
	}

	editJson(cb) {
		var data = this.getJson();
		data = cb(data)||data;
		this.setJson(data);
	}

	async jsonEmpty() {
		return Object.keys(await this.getJson()).length == 0
	}
}


class TamieFolder {
	constructor(folder=".") {
		this.path = path.join(rootDir,folder);
		console.log("Creating folder",this.path)
	}

	static RootResolve(folder) {
		return path.relative(rootDir,folder);
	}

	resolve(p) {
		return path.join(this.path,p);
	}

	getList() {
		return fs.readdirSync(this.path);
	}

	getStats(file) {
		return fs.statSync(this.resolve(file))
	}

	getFileList() {
		var folder = this;
		return this.getList().filter((file) => folder.getStats(file).isFile())
	}

	getFolderList() {
		var folder = this;
		return this.getList().filter((file) => folder.getStats(file).isDirectory())

	}

	require(id) {
		return require.main.require(".\\"+TamieFolder.RootResolve(this.resolve(id)));
	}

	getFolder(folder) {
		return new TamieFolder(TamieFolder.RootResolve(this.resolve(folder)));
	}

	getFile(file) {
		return new TamieFile(TamieFolder.RootResolve(this.resolve(file)));
	}
}
module.exports = {TamieFolder,TamieFile};