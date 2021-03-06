# 使用node.js纯手工打造个人博客

##### Tag: node.js, jquery, Materialize

>blog link: [http://www.fengfuming.com/](http://www.fengfuming.com/)

一枚前端菜鸟利用node.js打造的全栈node.js，整个产品从0到1到部署上线独立完成，是个人第一个全栈开发的成品（当然还是会有很多不足，欢迎指出）

这个项目我会坚持一年迭代一次，用学到新技术推倒重构，去优化他。欢迎各位监督(￣▽￣)~*

### 产品开发流程：

* 2017.4.22 产品立项 需求文档编写
* 2017.4.23 - 4.25 网站页面设计
* 2017.4.26 - 4.29 完成主页，列表页，详情页，生活页静态页面开发；接口设计，域名购买与服务器购买，备案。
* 2017.4.29 - 5.1 放假，修整。<(￣︶￣)>
* 2017.5.2 - 5.3 花了一个通宵，搭建后端服务器及数据库，完成前后端数据交互，完成对于数据库的增删改查操作，同时完成后台页面与管理员登录页面。基本完成整体博客功能的搭建
* 2017.5.4 - 5.5 完成登录注册功能
* 2017.5.6 - 5.7 完成点赞，评论功能，并完善相关细节
* 2017.5.8   备案完成，个人博客于当晚12点正式上线

*历时13+3天，从0到1，从设计到上线。*

### 技术栈？

	var skill = {
		neccessary: ['Node.js', 'mongodb','jQuery', 'ajax', 'css3', 'html', 'http', 'webServer', 'idea'],
		optional: ['Sense of Beauty', 'UI', 'router', 'design'],
		other: ['es6', 'database', 'smart', 'async', 'smart']
	}

当然除了上面列举的，可能还有一些涵盖不了的点。而且这也只是1.0版本开发时所主要依靠的。

**成为一名全栈工程师绝非易事，不过一点一滴积累，一步一个脚印去走，那一天，不远的。**

### 踩过的坑？

实在太多了，一把辛酸一把泪。不过收获很多，所幸开发过程中的遇到的所有坑或者个人认为比较有用的点，都记录了下来，稍后整理后也会同步上来。

### 实现功能

1. 注册登录。
2. 点赞。
3. 评论。
4. 后台管理实现对文章的增删改查
5. 出于安全考虑对于后台页面的路由保护
6. 首页点击照片动画切换
7. 博客页面分页查询
8. 博客页按技术类别分类

	......

### 目录层级

	├── images
	├── index.js
	├── node_modules
	├── package.json
	├── readme.md
	├── router
	│   ├── dynamic_router.js
	│   ├── router.js
	│   ├── router_mime.js
	│   └── static_router.js
	├── server.js
	└── static
	    ├── LICENSE
	    ├── coffeescript
	    ├── css
	    ├── favicon.ico
	    ├── fonts
	    ├── html
	    ├── image
	    ├── js
	    ├── npm-debug.log
	    └── stylus


### 优化方向

数据获取较大，接口设计可以优化，页面首次加载较慢，列表页获取数据数据量较大，代码可以优化压缩。

### 下版本开发展望

实现pwa，响应式开发提高移动端用户体验，优化业务逻辑，缩短加载页面时间。



### 结语

**期待您的宝贵意见，随时欢迎交流！**

**Waiting for your precious advice(code)!**

>24-h hot-mail: fengfuming2007@126.com

更多联系方式请戳[http://www.fengfuming.com/](http://www.fengfuming.com/)

more contact way plz click[http://www.fengfuming.com/](http://www.fengfuming.com/)

最后：衷心感谢那些在开发过程中热心给予我帮助的各位！

*ffmBlog V1.0  all copyright reserved*

---


#####优化更新v1.2 时间？

1. 优化文章页显示效果，对于markdown显示的图片和视频添加具体大小限制，优化显示效果 (done)
2. 列表页把content去掉，或者修改数据库表设计，自动截取10个字作为简短介绍。（还是去掉content吧），减少传输量，看能否加快列表页的显示
3. 图片压缩，静态资源扔到七牛云上。  (done,页面加载速度提高5倍以上，1s左右可以加载页面完毕)
4. 加载jquery文件十分耗时。（解决？ -> 把jquery也放到了七牛云上）
5. sessionStorage记录用户登录状态，就算刷新当前页面也可以，优化用户体验。
6. 改用https协议。
7. 显示文章应该倒序，按最新的显示在前面

###最近会重构布局

没有适配移动端的确很蛋疼，最近刚上手angular等框架，目测近期会开始着手重构整个博客。

个人博客还是会以记录个人学习经历及技术笔记为主。

下次更新会着重考虑移动端的体验与发布页，还有代码显示的美化

*敬请期待*


