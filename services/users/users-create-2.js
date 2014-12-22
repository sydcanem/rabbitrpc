var cli = require('cli-color');

module.exports = function (rpc) {

	rpc.add('user.create.rpc', function (msg, next) {
		var data = msg.content;

		console.log(cli.green('[users-create]'), data);

		// do some work and acknowledge messages, unacknowledge message will be left
		// in the queue and will be retried whenever a new request is published.
		setTimeout(function () {
			next(null, data);
		}, 500);
	} );

};