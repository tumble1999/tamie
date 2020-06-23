const EventEmitter = require('events');

class TamieEventHandler extends EventEmitter {
	constructor() {
		super();

	}
	bind(event) {
		return this.emit.bind(this,event);
	}
}

module.exports = TamieEventHandler;