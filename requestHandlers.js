const querystring = require('querystring');
const fs = require('fs');

function start(response, postData){
    console.log('Request handler start was called');
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('Hello Start');
        response.end();
}
function upload(response, postData){
    console.log('Request handler upload was called');
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Youve sent '+querystring.parse(postData).text);
    response.end();
}


exports.start = start;
exports.upload = upload;

