const fs = require("fs"),
	path = require("path");
module.exports = function () {
	this.fileman = {
		getDirs: function (srcPath) {
			return fs
				.readdirSync(srcPath)
				.filter((file) => fs.statSync(path.join(srcPath, file)).isDirectory());
		},
		read: async function (file, options = {}) {
			return new Promise((resolve, reject) => {
				fs.readFile(file, options, function (error, data) {
					if (error) {
						reject(error);
						return;
					}
					resolve(data);
				});
			});
		},
		write: async function (file, data, options = {}) {
			return new Promise((resolve, reject) => {
				fs.writeFile(file, data, options, function (error) {
					if (error) {
						reject(error);
						return;
					}
					resolve();
				});
			});
		},
		exists: async function (file) {
			return new Promise((resolve, reject) => {
				fs.exists(file, resolve);
			});
		},
		getInfo: async function (file) {
			return new Promise((resolve, reject) => {
				fs.stat(file, resolve);
			});
		},
		rename: async function (file, newName) {
			return new Promise((resolve, reject) => {
				fs.rename(file, newName, resolve);
			});
		},
		chown: async function (file, uid, gid) {
			return new Promise((resolve, reject) => {
				fs.chown(file, uid, gid, resolve);
			});
		},
		symlink: async function (file, dest) {
			return new Promise((resolve, reject) => {
				fs.symlink(file, dest, resolve);
			});
		},
		unlink: async function (file) {
			return new Promise((resolve, reject) => {
				fs.unlink(file, resolve);
			});
		},
	};
};
