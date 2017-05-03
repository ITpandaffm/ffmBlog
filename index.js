var server = require('./server.js');
var router = require('./router/router.js');

server.start(router.route);





