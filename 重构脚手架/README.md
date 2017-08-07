#React starterkit。

> React Starterkit for IE8 and above.

#checkout
git clone ssh://git@118.190.8.227:52772/kyee/kyee-his-front.git
git clone http://git.kychis.com:2288/kyee/kyee-his-front.git

### 脚手架使用前置条件
```
1，电脑上已有node，要求版本6.x
2, 进入当前项目路径，和package同级目录。使用npm install  或者 cnpm install 安装依赖包。
3, 使用npm命令开始开发。
```
### 各种开发编译命令。

```
$ npm run start
开发用，可自动编译更新，手动刷新浏览器（npm run startdev开发环境出现不停刷新时使用该环境）
http://localhost:8888 访问工程
ps: 当前只有挂号页，访问路径http://localhost:8888/#/register

```
```
$ npm run startdev
开发用，可自动编译更新，自动刷新浏览器
http://localhost:8888 访问工程
ps: 当前只有挂号页，访问路径http://localhost:8888/#/register

```
```
$ npm run startie8
开发用，可自动编译更新，ie8专用，每次修改代码后全量编译，故比较缓慢，且不会自动刷新浏览器
http://localhost:8088 访问工程
ps: 当前只有挂号页，访问路径http://localhost:8088/#/register
```
```
$ npm run pub
打包编译生成静态文件，代码兼容ie8,代码发布到dist路径下
```
```
$ npm run server
启动一个server，运行发布后的静态文件,不做任何打包编译操作。

```
```
tips：建议同时使用npm run start和npm run startie8两个开发环境，可在chrome下有更好的开发体验，同时能够检查ie8下页面的兼容性
```
```
工程目录说明：(#结尾的为文件夹)
kyee-his-front#
	--lib#  //放置需要单独引入的插件（比如jQuery）
	--src#  //源码目录
		--Action#  //每个组件模块的方法
		--Common#  //公共
			--component#  //公共组件文件夹
			--img#  //图片
			--css#  //公共css样式
				--static  //无需hash的css文件，一般为引入组件的样式文件
			--js#  //
				--common.js  //定义全局方法
				--config.js  //配置项文件
				--constant.js  //定义常量
		--Mocks#  //模拟数据文件夹
		--Reducer#  //redux全局变量及其处理方法文件夹
		--Views#  //页面模块文件夹
		--appRouter.jsx  //路由配置文件
	-- CLodop_Setup_for_Win32NT_https_2.102.exe  //打印控件，32位，ie，chrome下都可用，兼容以前的lodop
	-- CLodop_Setup_for_Win64NT_2.102.exe  //打印控件，64位，ie，chrome下都可用，兼容以前的lodop
```
```
tips：
	1，开发新页面时，除了在Views目录下添加对应页面组件，需要在kyee-his-front/src/appRouter.jsx文件中添加对应的路由
```
```
代码规范：
	1，js命名规范
		1，所有变量，方法名一律使用小驼峰命名规范。
		2，常量用全大写方式命名，单词之间下划线分隔开。
	2，css规范
		1，所有的reset代码放入kyee-his-front\src\Common\css\common.scss文件中。
		2，组件样式文件中，不得出现！important，或对单独的标签设置样式的写法。
		3，css命名规范使用类bem格式，三层或两层结构，block-element-modifier,以单个-连接，目的是语义化，也可简单的使用层级结构的类名，比如top-left-img,可以直观的理解为头部左侧的图片节点。
	3，文件夹以及文件命名规范
		除src下的顶级目录外，一律使用小驼峰格式命名。
	4，引入依赖包流程规范
		本地引入并在多版本浏览器测试后，确认兼容ie8之后才能正式引入，将package.json文件上传到线上仓库。
	5，公共组件编写规范
		1，组件的样式设定一个默认样式，并有对应的配置项参数可以单独配置，尽量做到每个节点都可以配置，并写好对应的注释，使用方法。
		2，三次以上引用频率的组件，尽可能抽取出来作为公共组件。
```

