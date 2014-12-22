var restify = require('restify');
var server  = restify.createServer();
var rpc     = require('kit-rpc').rpc({'replyQueue' : 'rest.callback'});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.dateParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());

var handlers = [
	{
		'method'      : 'post',
		'path'        : '/users',
		'version'     : '1.0.0',
		'description' : 'Get all users.',

		'handler' : function (request, response, next) {
			rpc.exec('user.create.rpc', request.body, function (err, message) {
				if ( err ) {
					response.send(500, err.toString());
					return next();
				}

				response.send(200, message.content);
				next();
			});
		}
	}
];

// Bootstrapping handlers
handlers.forEach(function (handler) {
	var options = {
		'strategy' : {'session' : false},

		'server' : {
			'path'    : handler.path,
			'version' : handler.version
		}
	};

	server[handler.method](options.server, [handler.handler]);
});

server.listen(3000, function (error) {
	if (error) {
		throw new Error(error);
	}

	console.log('Finished loading the application.\n');
});