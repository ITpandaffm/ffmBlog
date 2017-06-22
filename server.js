const http = require('http');
const url = require('url');


function start(route) {
    function onRequest(request, response) {
        var pathName = url.parse(request.url).pathname;//url.parse()方法把url字符串解析成一个url对象并返回
    	console.log('request for '+pathName+' received');
            route(pathName, response, request);
    }
    http.createServer(onRequest).listen(8080);
    console.log('Server has started');
}

exports.start = start;