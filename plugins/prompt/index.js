module.exports = async function ({ TamieInputEvents, TamieOutputEvents, TamieUtil, TamieConfig }) {
	var config = TamieConfig();
	if(await config.jsonEmpty()) {
		config.setJson({
			encoding:{
				in:"utf-8",
				out:"utf-8"
			}
		});
	}


	process.stdin.setEncoding((await config.getJson()).encoding.in);
	process.stdout.setEncoding((await config.getJson()).encoding.out);

	process.stdin.on("data",(data)=>TamieInputEvents.emit("stdin",TamieUtil.removeLastNewLine(data)));
	TamieOutputEvents.on("stdout",console.log);
}