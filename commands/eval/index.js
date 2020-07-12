module.exports = function({TamieProcessEvents,TamieOutputEvents},...p) {
	p.unshift("return");
	TamieOutputEvents.emit("stdout",Function(p.join(" ")).call(this))
}