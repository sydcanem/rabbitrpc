var cli = require('cli-color');
var rpc = require('kit-rpc').rpc({'replyQueue' : 'services.callback'});

console.log(cli.green('Starting users services.'));

require('./users-create')(rpc);
require('./users-update')(rpc);
require('./users-create-2')(rpc);