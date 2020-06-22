module.exports = function(tamie,...p) {
	p.unshift("return");
	tamie.say(Function(p.join(" ")).call(this))
}