module.exports = function({TamieOldContext},action,...p) {
	if(action=="help"){
		TamieOldContext.say("Program Manager Actions:",Object.keys(TamieOldContext.progman));
		return;
	}
	TamieOldContext.say(TamieOldContext.progman[action](...p));
}