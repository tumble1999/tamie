module.exports = function({TamieOldContext},action,...p) {
	if(action=="help"){
		TamieOldContext.say("File Manager Actions:",Object.keys(TamieOldContext.fileman))
		return
	}
	var o = TamieOldContext.fileman[action](...p);
	if(o.constructor.name=="Promise") {
		o.then(w=>TamieOldContext.say(w.toString()))
	} else {
		TamieOldContext.say(o.toString());
	}
}