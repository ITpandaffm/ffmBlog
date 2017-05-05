const url = require('url');
const querystring = require('querystring');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
var marked = require('marked');
// console.log(marked('I am using __markdown__.'));  //使用markdown  自动添加标签渲染

function route(pathName, response, request) {
    console.log('dynamic received pathName:' + pathName);
    var reqPara = querystring.parse(url.parse(request.url).query);
    switch (pathName) {
        case '/blog/articleList':
            //获取文章列表页
            //连接数据库`
            MongoClient.connect('mongodb://ffmblogAdmin:ffmblogAdmin@127.0.0.1:27017/blog', (err, db) => {
                if (err) {
                    console.log('connecnt error ', err);
                    return false;
                }

                console.log('mongo connected');
                //判断参数
                var page = reqPara.page;
                var tag = {};
                if (reqPara.tag !== 'all') {
                    tag = { tag: reqPara.tag };
                }

                var articleCollection = db.collection('article');

                articleCollection.find(tag).limit(4).skip((page - 1) * 4).toArray(function (err, docs) {
                    if (err) {
                        console.log('find error', err);
                    }
                    var returnData = {
                        articleList: {
                            content: docs,
                        }
                    };
                    response.writeHead(200, { 'Content-Type': 'text/json' });
                    response.end(JSON.stringify(returnData), 'utf-8');

                    console.log('close db');
                    db.close();
                });

            });
            break;
        case '/getArticle':
            //获取具体某篇文章
            MongoClient.connect('mongodb://ffmblogAdmin:ffmblogAdmin@127.0.0.1:27017/blog', (err, db) => {
                if (err) {
                    console.log('connecnt error ', err);
                    return false;
                }
                console.log('mongo connected');
                var articleId = reqPara.articleId;
                console.log(`articleId:${articleId}`);
                var articleCollection = db.collection('article');
                //把字符串的id转换成ObjectId类型
                var id = mongoose.Types.ObjectId(articleId);
                articleCollection.find({ _id: id }).toArray(function (err, docs) {
                    if (err) {
                        console.log('find error', err);
                    }
                    response.writeHead(200, { 'Content-Type': 'text/json' });
                    response.end(JSON.stringify(docs[0]), 'utf-8');
                    console.log('close db');
                    db.close();
                });

            });

            break;
        case '/signin':
            console.log(reqPara);
            if (reqPara.username === 'ffm' && reqPara.password === 'ffm') {
                //管理员登录
                response.writeHead(200, { 'Content-type': 'text/plain' });
                response.end('success');
            } else {
                //用户密码错误
                response.writeHead(200, { 'Content-type': 'text/plain' });
                response.end('wrong');
            }
            break;
        case '/addArticle':

            MongoClient.connect('mongodb://ffmblogAdmin:ffmblogAdmin@127.0.0.1:27017/blog', (err, db) => {
                if (err) {
                    console.log('connecnt error ', err);
                    return false;
                }
                console.log('mongo here');
                //增加文章
                if (request.method === 'POST') {
                    var postData = '';
                    request.on('data', (data) => {
                        postData += data;
                    });
                    request.on('end', () => {

                        var POST = querystring.parse(postData);

                        var articleCollection = db.collection('article');

                        var insertData = {
                            "title": POST.title,
                            "tag": POST.tag,
                            "content": marked(POST.content),
                            "createDate": new Date(),
                            "lastEditDate": new Date(),
                            "zan": 0,
                            "visited": 0
                        };

                        articleCollection.insert(insertData, (err, result) => {
                            if (err) {
                                console.log('insert error', err);
                            }
                            console.log('insert result', result);
                            response.writeHead(200, { 'Content-Type': 'text/plain' });
                            response.end('添加成功');
                            console.log('close db');
                            db.close();
                        });

                    });
                }

            });

            break;
        case '/deleteArticle':
            MongoClient.connect('mongodb://ffmblogAdmin:ffmblogAdmin@127.0.0.1:27017/blog', (err, db) => {
                if (err) {
                    console.log('connecnt error ', err);
                    return false;
                }
                console.log('mongo connected');
                var articleCollection = db.collection('article');
                console.log(reqPara.deleteId);
                var deleteId = mongoose.Types.ObjectId(reqPara.deleteId);
                console.log(deleteId);

                var deleteObject = articleCollection.find({ _id: deleteId });
                articleCollection.findOneAndDelete({ _id: deleteId }, (err, result) => {
                    if (err) {
                        console.log('delete error', err);
                        return false;
                    }
                    response.writeHead(200, { 'Content-Type': 'text/plain' });
                    response.end('删除成功');
                    console.log('close db');
                    db.close();
                });

            });
            break;
        case '/rewriteArticle':
            MongoClient.connect('mongodb://ffmblogAdmin:ffmblogAdmin@127.0.0.1:27017/blog', (err, db) => {
                if (err) {
                    console.log('connecnt error ', err);
                    return false;
                }
                console.log('mongo connected');
                var articleCollection = db.collection('article');
                console.log(reqPara.rewriteId);
                var rewriteId = mongoose.Types.ObjectId(reqPara.rewriteId);

                articleCollection.find({ _id: rewriteId }).toArray(function (err, docs) {
                    if (err) {
                        console.log('rewrite find error', err);
                    }
                    response.writeHead(200, { 'Content-Type': 'text/json' });
                    response.end(JSON.stringify(docs[0]), 'utf-8');
                    console.log('close db');
                    db.close();
                });

            });
            break;
        case '/rewriteArticle/Done':
            console.log('/rewriteArticle/Done');
            MongoClient.connect('mongodb://ffmblogAdmin:ffmblogAdmin@127.0.0.1:27017/blog', (err, db) => {
                if (err) {
                    console.log('connecnt error ', err);
                    return false;
                }
                console.log('mongo here');
                //增加文章
                if (request.method === 'POST') {
                    var postData = '';
                    request.on('data', (data) => {
                        postData += data;
                    });
                    request.on('end', () => {

                        var POST = querystring.parse(postData);

                        var articleCollection = db.collection('article');

                        var rewriteDoneId = mongoose.Types.ObjectId(POST._id);
                        var rewriteDoneData = querystring.parse(POST.rewriteData);

                        console.log('rewriteDoneData type', typeof rewriteDoneData);
                        console.log('rewriteDoneData', rewriteDoneData);
                        console.log('rewriteDoneId', rewriteDoneId);

                        console.log(articleCollection.find({ _id: rewriteDoneId }));

                        articleCollection.update({ _id: rewriteDoneId }, {
                            $set: {
                                title: rewriteDoneData.title,
                                tag: rewriteDoneData.tag,
                                content: marked(rewriteDoneData.content),
                                lastEditDate: new Date()
                            }
                        }, (err, result) => {
                            if (err) {
                                console.log('insert error', err);
                            }
                            console.log('update result');
                            response.writeHead(200, { 'Content-Type': 'text/plain' });
                            response.end('修改成功');
                            console.log('close db');
                            db.close();
                        });
                    });
                }

            });
            break;
        case '/getComment':
            MongoClient.connect('mongodb://ffmblogAdmin:ffmblogAdmin@127.0.0.1:27017/blog', (err, db) => {
                if (err) {
                    console.log('connecnt error ', err);
                    return false;
                }
                console.log('mongo connected');
                var commentCollection = db.collection('comment');
            // var commentArticleId = mongoose.Types.ObjectId(reqPara.articleId);  //此处不需要转化，因为已经转化，不是主键，只是找同一篇文章的所有评论
                var commentArticleId = reqPara.articleId;

                commentCollection.find({article_id: commentArticleId}).toArray(function (err, docs) {
                    if (err) {
                        console.log('getComment find error', err);
                    }
                    console.log(docs);
                    var returnCommentCountData = { commentArr:docs };
                    response.writeHead(200, { 'Content-Type': 'text/json' });
                    response.end(JSON.stringify(returnCommentCountData), 'utf-8');
                    console.log('close db');
                    db.close();
                });

            });
            break;
            case '/getCommentCount':
            MongoClient.connect('mongodb://ffmblogAdmin:ffmblogAdmin@127.0.0.1:27017/blog', (err, db) => {
                if (err) {
                    console.log('connecnt error ', err);
                    return false;
                }
                console.log('mongo connected');
                var commentCollection = db.collection('comment');
                var commentCountArticleId = reqPara.articleId;

                commentCollection.find({article_id: commentCountArticleId}).toArray(function (err, docs) {
                    if (err) {
                        console.log('getComment find error', err);
                    }
                    
                    var returnCommentData = { commentArr:docs.length, num: reqPara.num };
                    response.writeHead(200, { 'Content-Type': 'text/json' });
                    response.end(JSON.stringify(returnCommentData), 'utf-8');
                    console.log('close db');
                    db.close();
                });

            });                
                break;
        default:
            console.log('default');
    }
    
}

exports.route = route;

