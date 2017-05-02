
const fs = require('fs');
const mimeRouter = require('./router_mime.js');

function route(pathName, response, request){
    console.log('staticRoute receievd pathName:'+pathName);
    var extend = getExtend(pathName);
    var contentType = mimeRouter.mime[extend];
    if(contentType){
        //存在相关的文件类型
        //注意此时pathName是/开头的，会到根目录查找，需要在前面加个.，在当前目录中查找
        var filePath = '.'+pathName;
        if(contentType === 'text/html'){
            filePath = './static/html'+pathName;
        }

        fs.stat(filePath, (err, fsstat)=>{
            if(err){
                console.log('stat error'+ err);
            } else {
                if (fsstat.isFile()){
                    fs.readFile(filePath, (err, data)=>{
                        if(err){
                            console.log('read File err'+ err);
                        } else {
                            response.writeHead(200, {'Content-type':contentType});
                            response.write(data);
                            response.end();
                        }
                    });
                }
            }
        });
    } else {
        response.writeHead(404, {'Content-type': 'text/html'});
        response.write('<h1>404 file type  not found</h1><br>');
        response.end('See you');
    }
}

function getExtend(pathName){
    var dotIndex = pathName.lastIndexOf('.');
    //pathName是url解析过来，已经默认去除了?后面的参数了。
    //var paraIndex = pathName.lastIndexOf('?');
    return pathName.substring(dotIndex);
}



exports.route = route;
