module.exports = function(tamie,action,...p) {
	if(action=="help"){
		tamie.say("Program Manager Actions:",Object.keys(tamie.progman));
		return;
	}
	tamie.say(tamie.progman[action](...p));
}