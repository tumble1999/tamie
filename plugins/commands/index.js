module.exports = async function({TamieInputEvents,TamieProcessEvents,TamieOutputEvents,TamieFolder,TamieUtil,TamieOldContext}) {
	var commandsFolder = new TamieFolder("commands");
	var commandNames = commandsFolder.getFolderList();
	var commands = {
		help:function({TamieOutputEvents}){
			TamieOutputEvents.emit("stdout","List of Commands",commandNames);
		}
	};

	//Load Commands
	for(var i of commandNames) {
		console.log("loading command",i);
		TamieUtil.validDir(i);
		commands[i] = commandsFolder.require(i);
	}

	TamieInputEvents.on("stdin",function (t) {
		t = t.split(" ");
		var c = t.shift()
		if (!commands[c]) {
			TamieOutputEvents.emit("stdout",c)
			return;
		}
		try {
			commands[c]({TamieProcessEvents,TamieOutputEvents,TamieOldContext}, ...t)
		} catch (e) {
			TamieOutputEvents.emit("stdout",e)
		};
	})
}