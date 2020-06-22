module.exports = function(tamie,action,...p) {
	if(action=="help"){
		tamie.say("File Manager Actions:",Object.keys(tamie.fileman))
		return
	}
	var o = tamie.fileman[action](...p);
	if(o.constructor.name=="Promise") {
		o.then(w=>tamie.say(w.toString()))
	} else {
		tamie.say(o.toString());
	}
}