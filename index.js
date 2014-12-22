// Services
// Note:
// This services will be on different machines.
require('./services/users');

// Rest client
require('./rest.rpc');

process.on('SIGINT', function () {
	process.exit();
});