const url = require('url');
const querystring = require('querystring');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

function route(pathName, response, request){
    console.log('dynamic received pathName:'+pathName);
    var reqPara = querystring.parse(url.parse(request.url).query);
    switch (pathName) {
        case '/blog/articleList':
            //获取文章列表页
            //连接数据库`
            mongoose.connect('mongodb://guest:guest@127.0.0.1:27017/blog');
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error'));
            db.once('open', function(){
                console.log('mongoose:database successfully connected');

                //判断参数
                var page = reqPara.page;
                var tag = {};
                if(reqPara.tag !== 'all'){
                    tag = { tag: reqPara.tag};
                }

                var articleCollection = db.collection('article');
                articleCollection.find(tag).limit(4).skip((page-1)*4).toArray(function(err, docs){
                    if(err){
                        console.log('find error',err);
                    }
                    var returnData = {
                        articleList:{
                            content: docs,
                            page: 1,
                            tag: 'all'
                        }
                    };
                     response.writeHead(200, {'Content-Type': 'text/json'});
                     response.end(JSON.stringify(returnData), 'utf-8');
                });

                db.close();
            });

            break;
        case '/getArticle':
            //获取具体某篇文章
             mongoose.connect('mongodb://guest:guest@127.0.0.1:27017/blog');
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error'));
            db.once('open', function(){
                console.log('mongoose:database successfully connected');

                //判断参数
                var articleId = reqPara.articleId;
                console.log(`articleId:${articleId}`);
                var articleCollection = db.collection('article');
                //把字符串的id转换成ObjectId类型
                var id = mongoose.Types.ObjectId(articleId);
                articleCollection.find({_id: id}).toArray(function(err, docs){
                    if(err){
                        console.log('find error',err);
                    }
                     response.writeHead(200, {'Content-Type': 'text/json'});
                     response.end(JSON.stringify(docs[0]), 'utf-8');
                });

                db.close();
            });                       
            break;
        default:
            console.log('default');

    }

}

exports.route = route;

