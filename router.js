var staticRouter = require('./static_router.js');
var dynamicRouter = require('./dynamic_router.js');


function route(pathName, response, request){
    console.log('About to route a request for '+ pathName);
    if (pathName.indexOf('.') != -1){
        //路径里包含有. 即说明要获取某个文件
        staticRouter.route(pathName, response, request);
    } else if (isPage(pathName)){
        switch (pathName){
            case '/':
                pathName = pathName + 'index.html';
                staticRouter.route(pathName, response, request);
                break;
            case '/blog':
                pathName = pathName + '.html';
                staticRouter.route(pathName, response, request);
                break;
            case '/life':
                pathName = pathName + '.html';
                staticRouter.route(pathName, response, request);
                break;
            default:
                response.writeHead(404, {'Content-type':'text/plain'});
                response.write('404 not found!');
                response.end();
        }
    } else {
        dynamicRouter.route(pathName, response, request);
    }
}

function isPage(pathName){
    switch(pathName){
        case '/':
        case '/blog':
        case '/life':
            return true;
        default:
            return false;
    }
}



exports.route = route;
