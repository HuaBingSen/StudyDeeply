### 简介
- 含义： JavaScript语言的服务器运行环境，及 JavaScript的工具库 【提供与操作系统互动的工具文件读写、新建子进程之类】
---
- 安装与更新    
    - 直接下载安装包，解压运行，`node --version` 或者 `node -v`
    - 更新Nodejs版本， 可以通过node.js的n模块完成 【只支持Linux、Mac】 | nvm windos可以找nvm-windows | fnm
    - NodeJS特性
        1. 异步和事件驱动得的Nodejs库
        2. v8引擎
        3. 单线程且高度可扩张，NodeJS使用事件循环模型
        4. 无需缓冲
        - 常用node 命令
            - 全局安装 本地安装（项目内）
            - npm ls 或者 npm list 列出本地安装的所有模块 ls = list
            - npm install express@0.01   【@0.01 指定版本，也可以不加，默认安装最新稳定版】
            - npm uninstall express
            - npm search express  // 搜索包名
            - npm update // 升级当前目录下的所有模块
            - npm update express // 升级当前目录下的指定express模块
    - nvm 控制 node版本，安装了nvm就同时安装了nodejs, nvm 全称 node version package
        nvm 安装完毕，可以按下列顺序执行命令
        - nvm list avairable  查看可用的NodeJs版本,生成内容是部分列表 【LTS = long term support 长期支持版, 通常支持3-5年， 比较稳定的版本（一般用于企业级），但是不提供最新功能，可能错过最新的硬件支持喝最新的应用程序升级 】
        - nvm install <version> 安装指定版本
        - nvm list 查看已安装版本
        - nvm current 查看当前使用版本
        - nvm use <version> 切换使用指定node版本
    **注意：nvm可以切换国内镜像** 【公司的网一般没有翻墙软件甚至可能网速更慢】
        如果下载node过慢，或者安装失败，可以更换国内镜像源，在nvm的setting.txt路径下，设置 node_mirro 与 npm_mirror 为国内镜像
    - node 命令后面不加任何内容，则进入 REPL(read eval print loop 读-求值-打印-循环的环境： 交互解释器)
    - 异步操作
        - 单线程（后续的Worker线程带来了多线程方案），大量采用异步操作，即事件循环。
        - 回调参数作为函数，则Node中约定，回调函数是最后一个参数； 且 回调函数本身的第一个参数，约定为上一步传入的错误对象
        - 全局对象
            - global： 全局环境对象，但是模块中定义的属性不在global中，与浏览器环境的window对象有差异，因为模块的全局变量都是该模块私有的
            - process：表示Noded所处的当前进程，允许开发者与该进程互动
            - console：指向Node内置得console模块
        - 全局函数 
            - setTimeout()
            - setTimeInterval()
            - clearTimeout()
            - clearInterval()
            - require()
            - Buffer() 操作二进制数据， 此处想到浏览器环境的ArrayBuffer及Blob对象
        - 全局变量
            - __fileName: 指向当前运行的脚本文件名
            - __dirname: 指向当前运行的脚本所在目录
        - 模块变量
            module, module.exports. exports
### 模块化结构
- 含义：NodeJS遵循CommonJS规范，模块和文件是一一对应关系。
- reuire(module) 加载的module模块可以是一个相对当前脚本所在的相对路径，也可以是不含文件路径的文件名，此时node会去模块的安装目录寻找已安装的目录；  寻找层次：当前目录， 已安装目录， package.json中配置路径， index.js,  index.node
- 核心模块
    Nodejs 的主要作用，也是通过其提供的丰富模块，与操作系统进行交互，完成一系列功能；
    主要模块有：
    - http: 提供http服务器功能
    - url: 解析URL
    - fs: 文件交互系统
    - querystring: 解析URL的查询字符串
    - child_process: 新建子进程
    - util: 提供实用小工具
    - path: 处理文件路径
    - crypto：加密和解密功能，基本上对OpenSSL的包装
- 自定义模块
    module.exports 变量导出， require() 引入
### 异常处理
-   由于是单线程运行环境，所以一旦抛出的异常没有被捕获，就会引起整个进程崩溃，node的异常处理非常重要对于稳定运行
-   三种方式处理Erro
    - throw 抛出错误对象
    - 错误对象传递给回调函数，由回调函数发出错误
    - EventEmitter接口，发出error事件
- try...catch: 异步抛出的错误会在事件循环的下一步抛出，在外层加catch捕获不到，把try catch 放在异步之中就能捕获到 + throw new Error("error async")
- 回调函数， 回调函数的第一个参数设置为Error对象，第二个参数才是真正返回的数据；如果确定没有发生错误，回调函数的第一个参数就传入null
-   1. `const EventEmiter = require('events').EventEmitter;`
        `const emitter = new EventEmiter();` 
        `emitter.emit('error', new Error('bad thing'));`
        同时必须设置error事件的监听函数,如果不部署监听事件，出错会导致程序崩溃。
        `emitter.on('error', err => { cnsole.log('catch bad')})`
    2.   `uncaughtException`事件能捕获未被捕获的异常 【比如前文提到的try catch里的异步任务抛出的异常】
    `process.on('uncaughException', err => {
        console.log(err);
        process.exit(1)
    })`
    3. unhandledRejection事件， 可以用来监听没有捕获的Promise对象的rejected状态
    `process.on('unhandledRejection', (err, p) => {console.error(err.stack)})`
### 命令行脚本
### assert模块
- 含义： 内置模块，用于断言，如果表达式不符合预期，就抛出一个错误，有11个方法，少数几个常用
- assert(expression,  message)； 表达式的值为true,则断言内容 message不会提示，只有为false,断言内容才会抛出错误
- assert.ok() = assert()
- assert.equal(actual, expected, [message])  equal的比较是 == 不是严格等于
- notEqual()  !=
- deepEqual() 用来比较两个对象，只要其属性一一对应，且值都相等，则认为两个对象相等
- srictEqual() 严格等于 ===
- notSrictEqual() !== 严格不相等
- assert.ifError() 可以用于回调函数的第一个参数， 用于判断某个表达式是否是false, 表达式的值为true，就抛出一个错误
- fail(actual, expected, message, operator) 总是会抛出一个错误
### CommonJS规范
- 模块 module对象的一些属性
    - moudule.id 模块标识符，通常是带有绝对路径得模块文件名
    - .filename 模块的文件名
    - .loaded
    - .parent 表示调用该模块的模块，是一个对象
    - .children 表示该模块要用到的其他模块，是一个数组
    - .exports 模块对外暴露的对象
- require() 
    - 加载，同步加载，第一次加载后就会缓存，require的参数默认是加载.js, 如果不是会.js ,node会添加.js, .json, .node 去搜索加载
    - 最好目录中，设置一个入口文件，让require方法可以通过该入口加载整个目录
    - delete require.cache[moduleName] 能删除模块内的缓存； Object.keys(require.cache)方法可在遍历中删除所有缓存的模块
    - 缓存是根据绝对路径识别模块的，同样模块名，不同的保存路径，require命令还是会加载该模块
    - require 互相引用，后者会加载不完整的对方防止循环引用
    - require 输出的是拷贝值，外界影响不到模块内部
    - require.resolve() 将模块名解析到一个绝对路径

    - require的内部处理流程
        - 不是全局命令，指向当前模块的module.require 命令， module.require 调用 node内部命令 Module._load
        - Module._load = function(request, parent, isMain) {
            // 1. 检查 Module._cache, 是否缓存之中有指定模块
            // 2. 如果缓存之中没有，创建一个新的Module实例
            // 3. 将新的实例保存到缓存中
            // 4. 使用 module.load() 加载指定的模块文件
            //  读取文件内容后，使用module.compile() 执行文件代码
            // 5. 加载/解析 过程中报错， 就从缓存中删除该模块
            // 6. 返回该模块的 module.exports
        }
        - 第四步的compile过程实现逻辑如下
        ModUle.prototype._compile = function(content, filename) {
            // 1. 生成一个require函数， 指向module.reqire
            // 2. 加载其他辅助方法到require
            // 3. 将文件内容放到一个函数中，该函数调用 require
            // 4. 执行该函数
        }
### package.json 文件
- 概述：每个项目的根目录下面，一般都有package.json文件。该文件定义了这个项目所需要的各种模块，以及项目的配置信息（项目名称，版本，等）。npm install命令会读取该命令配置项，自动下载开发环境的模块依赖。
- scripts 字段
    指定了 运行脚本命令的npm命令行缩写
- dependencies（项目运行时所需依赖）  devDependencies（项目开发时所需依赖）
    - 对依赖加上限定的版本号
        - 指定版本：1.2.3 '大版本.次要版本.小版本'
        - 波浪号（tilde） + 指定版本： ~1.2.2 安装 大于 1.2.2的最新版本，但是不安装1.3.x, 波浪号表示 **精确到次要版本号**
        - 插入号 (caret): ^1.2.2 安装 大于 1.2.2的最新版本，但不得安装2.x.x版本，**精确到主要版本号** 当大版本号为0，波浪号和插入号作用相同，处于开发阶段，次要版本号变动也可能带来程序不兼容
- peerDependencies
    -peer 同龄人的意思，意思时 提醒用户安装某个插件A的时候，另一个依赖的插件B必须**指定B版本**，才能使用A插件;该依赖配置，也是放在一个对象中；写法如下：
    {
        "name": "chai-as-promised",
        "peerDependencies": {
            "chai": "1.x"
        }
    }
    **npm3.0开始， peerDependencies 不再默认安装**
- bin 字段
    指定各个内部命令对应得可执行文件的位置， 由于 node_modules/.bin/目录会再运行时，加入系统的path变量，所以运行npm时，可以不带路径，直接npm + 文件执行
    `scripts: {  
        start: './node_modules/bin/someTool.js build'
    }
    // 简写为
    scripts: {  
    start: 'someTool build'
    }`
- main 字段
    指定了加载项目的入口文件，main字段默认值是根目录下的index.js文件
- config字段
    用于添加命令行的环境变量，比如指定端口port
- browser 字段
    指定该模板供浏览器使用的版本
- engines 字段、
    指明模块运行平台 如node或者浏览器的版本范围； 也可以指定npm版本范围
- man字段 linux命令， 指定一个或多个文件
- preferGlobal
- style
    是个数组，指定供浏览器使用时，样式所在的位置
### path模块
unix系统是'/', windows系统'\'  类unxi左斜杠， windows 右斜杠
- require() 引入path模块
- path.join('a', "b") 拼接路径，结果为 \a\b
- path.resolve('a/c', './d')得到/a/c/d 将相对路径转为绝对路径，接受多个参数，执行原理 cd dir,从左到右不断进入目录，如果参数无法得到绝对路径，则以当前目录作为路径基准
-  fs.accessSync() 同步读取一个路径, 这是fs模块的方法
- path.relative(absolutePaht1, absolutePaht2) 接受两个绝对路径，返回第二个路径相对于第一个路径 相对于 第一个路径的相对路径
`path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')` 返回 ../../impl/bbb
- path.parse() 返回路径各部分的信息
    - path.parse(path1).base 返回最后一层目录的文件
    - path.parse(path1).name 返回最后一层目录的文件的文件名
    - path.parse(path1).ext 返回最后一层目录的文件类型尾缀
### process对象
- 含义：process, node的一个全局对向，提供当前进程的相关信息，可以在任意脚本位置使用，process上有EventEmitter接口
- 属性：
    - process.env 返回一个对象，成员为当前shell的环境变量
    - process.pid 数字，当前进程号 process id
    - process.platform 当前操作系统 windows下是win32, 因为只是显示操作系统类型，不会显示操作系统版本，历史原因windows是32位处理器和操作系统开始的，就显示一个win32就够了
    - process.stdout 返回一个对象，表示标准输出流。该对象的write方法等同于console.log
    - process.stdin 返回一个对象，标准输入流， 这两个输入输出对象与其他进程通信，都是流的形式，所以必须通过pipe管道命令中介
    - process.env 返回当前shell的所有环境变量； 通常会新建一个环境变量NODE_ENV添加到env对象中，开发环境是develop或者saging，生产环境是production
- 方法
    - process.chdir() 切换目录
    - process.cwd() 返回当前目录
    - process.exit() 退出进程
    - process.nextTick() 事件放到当前事件循环的尾部
    - process.on() 因为process部署了EventEmitter接口，可以直接监听各种事件，指定回调;
        - 支持uncaughtException，data事件（数据输出输入时触发），SIGINT(CTRL +C退出),SIGTERM(系统发出进程终止信号SIGTERM候触发)
    - process.kill(process.pid, 'SIGINT') ，对指定ID进程发出信号， 默认是SIGINT信号
- 事件
    - process.eixt事件 进程退出， process.on监听该事件的回调中不能监听异步，只能监听同步
    - process.beforeExit事件，监听该事件的回调中可以是异步
    - process.uncaughtException事件，进程抛出一个没有被捕获的错误，会被该事件捕获
- 进程退出码
    - 0 正常退出
    - 1 发生未捕获错误
    - 5 v8执行错误
    - 8 不正确的参数
### Chlid Process模块
- 含义： child_process模块，用于新建子进程。运行结果存在系统缓存中，最大200kb, 等子进程运行结束，主进程 用回调函数读取子进程的运行结果
- 方法： 
    const exec = require('child_process').exec;
    - exec(command, callback) 用于执行bash命令，command 表示shell命令，callback(error, stdout, stderr)
    - execSync 上面方法的同步版本
    - execFile 直接执行特定程序，第一个参数是执行的文件路径， 第二个参数是数组传入命令， 第三个是回调
    - spawn 创建一个子进程来执行特定顶命令，但没回调函数，spawn是产卵的意思， 只能通过监听事件获取结果，属于异步，适合子进程长时间运行情况。
    - fork 创建一个子进程，执行node脚本，fork会在父子进程之间，建立通信管道，用于通信
    - send 与 on('message', callback)方法对应，用于通信
### http模块
- 处理get请求
    - 通过http模块的createServer创建一个http服务器，通过回调设置请求和响应的相关内容，设置监听端口
    - request对象
        - `const http = require('http'); `  
        `const server = http.createServer((request, response) => {})`
        - response.writeHeade方法写入http响应头信息；response.end方法写入http相应内容，以及回应完后关闭本次对话；
        - reqest对象有以下属性
            - url: 发出请求的网址
            - method: http请求方法
            - headers: http请求的所有http头信息
- 处理post请求
    - 服务端可以对data和end两个事件，设置监听函数
        - data事件，数据接收过程中，每收到一段数据就触发一次，接收到的数据被传入回调函数
        - end事件，接受完所有数据后触发
- http.get(options, res => {})  options中包含了 host、port、method、path、aget、keepAlive等http请求信息数据
- http.resuest(options[, callback]) 返回的是一个http.ClientRequest类的实例
- http.Server()
    - new http.Server()
    - server.on('request', (req, res) => {

    })
- server.listen(8080) 
- server.listen(8080, 'localhost')
- server.listen({
    port: 8080,
    host: 'localhost'
}) 
- 搭建httpps服务器
    - 要有ssl证书，对于向公众提供服务的网站，ssl证书要购买，自用可以用openssl生成
    - https.createServer(options, (req, res) => { })
- http回应方法
    - setHeader(key, value) 指定HTTP头信息
    - write(str) 指定回应内容
    - end() 发送http回应
### Buffer模块
- 需要require引入buffer, 解构出Buffer对象，处理二进制数据 【建议看nodejs官方文档，这里阮一峰的过时了】
- const { Buffer } =  require('buffer)
### npm包管理器
- npm 1. node开发登记和管理模块 npmjs.org 2. 模块管理器（安装Node后最好将npm更新到最新版本）因为npm可能不是最新的
- npn init -y 将一个文件目录初始化，生成package.json文件
- npm cofig set prefix 可指定模块的全局安装目录
- npm info packageName 可查看模块具体信息
- npm search packageName 搜索npm仓库
- npm list 列出当前项目安装模块
    - npm list -global 列出全局安装模块
    - npm list underscore 列出单个模块内容
    - npm install
        - 全局安装 -g 或者 本地项目目录安装
        - npm install git://github.com/xxx 可以直接接git地址
        - npm install packageNmae --force 强制安装，不论是否存在
        - rm -fr node_modules 循环递归强制删除，再重新安装 npm install
        - npm install vue-router@latest  | vue-router@x.x.x | vue-router@">=1.1.0 < 0.2.0>"
        - --save -S   | -save-dev  -D
    - npm undate packagename
    - npm undate -global  packagename 
    - npm uninstall
    - package.json的scripts字段中保存了脚本命令
    - npm run 是 npm run-script的简写，都可用
    - npm test === npm run test | npm start === npm run start
    - 一个操作的输出，是另一个操作的输入，可用linux的管道命令 ‘|’
    - "build": npm run build-js && npm run build-css 继发执行，也可 & 平行执行
    - 流操作 < 与 > 可以管道操作结合 |
    - npm-run-all该模块可以运行多个scripts脚本命令
    - "start": "npm-run-all --parallel dev server"  平行执行dev和server === &
    - 通配符 "dev": "npm-run-all dev:*" 继发执行所有dev的子命令
    - "dev:autoprefix": "postcss --use autoprefixer --autoprefixer.browsers \"> 5%\" --output src/css/hoodie.css src/css/hoodie.css" 为css文件加浏览器前缀，只考虑市场份额大于5%的
    - server脚本命令
        - "server": "live-server dist/ --port-8080"
        - live-server功能：
            - live-server 启动http服务器，展示指定目录 dist/ 下的 inde.html文件
            -  添加自动刷新功能，只要指定目录中文件有任何变化，会刷新页面
            - npm run server执行后自动打开浏览器
    - test命令用于执行测试脚本命令的语法错误等
    - prod脚本命令 规定 进入生产环境需要做的处理
    - pre- 和 post- 脚本
        - npm run 为每条命令提供 pre- 和 post- 两个钩子， 比如 npm run insall 其实包含了
        inp run preinsall,  npm run install, npm run postlint  (npm会先检查有没有定义preinstall和postinstall这两个钩子)
        - 前面的pre脚本执行出错，则不会执行后面的脚本
        - 可以在scripts中直接声明pre命令，以配置别的命令
- npm link
    - 开发npm 模块的时候，希望便开发边试用， npm link会建立一个符号链接指向目录本地模块 【以后自己也要去开发一个npm模块,去尝试，随便什么模块，也可以想个idea】
- npm bin 显示可执行脚本所在目录.bin
- npm adduser 命令用于再npmjs.com 注册用户，以后开发npm模块，要发布到npmjs.com用
- npm publish 将当前模块发布到npmjs.com
- npm depcrecate 废弃某个版本的模块
### url模块
- 作用：用于生成和解析 URL
- const urlObj = new URL(href)
- 生成的urlObj实例中有常用的各个url组成部分：host, hostname, href, origin, pathname, protocol, search等等
- url.resolve(from, to)
### querystring模块
- 主要用来解析查询字符串
- querystring.parse(str[, sep[, eq[, options]]])
    - sep 是多个键值对之间的分隔符，默认为 &
    - eq 键名与键值之间的分隔符，默认为 =
    - options
### Cluster模块
- 含义：集群概念（其实和后端的集群还是有很大区别，这里的cluster更多是和Javascript中的Worker类似）。 nodejs默认单线程，32位系统最高可使用512M内存，对64位系统最高支持1GB内存。多核CPU来说，这样效率低，cluster模块就是为了解决该问题。
- cluster模块，允许设立一个 主进程 和 若干worker进程, 主进程监控和协调worker进程的运行。worker进程之间采用通信交换信息。cluster内置一个负载均衡器
- 基本用法：cluster模块的isMaster方法能判断当前进程是否式主进程，如果是可以使用os模块的cpus方法获取核数，遍历来创建多个worker进程(fork方法)
- cluster能监听其子进程的exit推出事件和online事件（worker正常运行）
- worker对象
    - worker对象是cluster.fork()的返回值，代表一个worker进程
    - 属性和方法
        - worker.id 进程独一无二的编号
        - worker.process 获取worker所在的进程对象。所有的worker都是childer_process.fork() 生成的
        - worker.send() 主进程向子进程发消息
        - 子进程中向主进程发消息，使用process.on('message', msg => process.send(msg))
- cluster.workers 主进程获取所有的子进程
- cluster模块的属性和方法
    - cluster.isMaster 该属性判断是否是主进程，返回bool值, isWorker 该属性判断是否是worker进程，返回bool值
    - cluster.fork() 创建worker进程，返回woker对象
    - cluster.kill() 终止worker进程
    - listening事件，worker进程调用listening方法，主进程 cluster.on('listening', (worker, address) => {}) worker为当前worker对象，address为地址对象，
    包含 网址、端口、地址类型（ipv4 ipv6 网络协议等）
### os模块
- 操作系统相关属性和方法
### dns模块
- 该模块能查找主机名的IP地址
### Events模块
-概述： Eventer Emitter是events模块的一个接口，可以生成EventEmiiter实例，实例上有监听事件的on方法和emit方法派发事件(基础用法)
- EventEmitter接口部署在任意对象
    - AnyObject.prototype.__proto__ = EventEmitter.prototype (写法一)
    - AnyObject.prototype = Object.create(EventEmitter.prototype) （写法二）
    - 也可以用util内置模块的inherits方法，继承EventEmitter接口 `util.inherits(Radio, EventEmitter)`
- EventEmitter实例方法
    - on(evnet, callback)
    - addListener(evnet, callback) 与on一样
    - once(evnet, callback) 监听一次，使用后移除实例
    - listeners(evnet) 返回一个数组，成员是事件的所有监听函数
    - removeListener(event, callback) 移除事件的监听函数
    - removeAllListeners(event)
    - setMaxListeners(max) nodejs默认允许同一个事件最多指定10个回调函数超出警告，但setMaxListeners方法可以改变
- Events模块默认支持两个事件。
    - newListener事件， 添加新的监听事件时会触发
    - removeListener事件， 移除事件监听回调会触发
### fs模块
- 概述： fs全称filesystem缩写，提供本地文件的读写能力，提供了同步和异步两种操作方式；
    1. readFile()  readFileSync()
        - readFile(filepath, (err, buffer) => {}) 异步读书文件数据 filepath如果是相对路径，是相对当前进程所在路径
        - const text = readFileSync(filepath, { encoding: 'utf8', flag: 'r'}) 返回字符串，不设置编码格式则返回Buffer实例，否则返回字符串
        - 读取文件时，根据不同系统结尾字符不同，可以做不同的换行处理
            `const eol = process.platform === 'win32' ? '\r\n : '\n''`
    2. writeFile() writeFileSync()
        - writeFile(filepath, str, [ 'utf8', callback ]) 
        - writeFileSync(filepath, str, 'utf8')
    3. exists(path, callback) 判断给定路径是否存在的方法
    4. fs.mkdir('./dirName', 0777, err =>{}) 创建目录；   fs.readdir(dir, (err, files) => {})； 读取目录， 返回一个所包含的文件和子目录的数组
    5. fs.stat() 参数是一个文件或目录， 返回一个对象， 该对象有 isFile() 和 isDirectory() 两个方法，用来判断是目录还是文件
    6. watchFile(filepath, (curr, prev) => { }) 监听文件变化，回调函数返回变化前后时间; unwatchFile() 移除对文本监听
    7. createReadStream(filepath) 用于打开大型文件文本
    8. createWriteStream(filepath) 创建一个写入数据流对象
### stream模块
- 序言： 数据读写，是事件模式的特殊实例。不断发送的数据块 = 一个个事件，读数据read事件，写数据write事件，数据块是事件的附带信息。node提供了特殊接口Stream;
- 概述： 
    - 1. 概念
        - 数据流 是处理系统缓存的一种方式。 node应用两种处理方式：1. 所有数据接收完毕，一次性从缓存中读取；2. 数据流方式， 收到一块数据，就读取一块【数据流】。
        - 数据流的处理方式，每次只读入数据的小块，每当系统读入一小块数据，就会触发一个事件，发出“新数据块”的信号。应用程序只要监听该事件，就能掌握数据读取的进展，提高了程序的性能
        - ` const fs = require('fs')
        fs.createReadStream('./data/customers.csv).pipe(process.stdout)
        `
        - 数据流接口的通信事件：readable、writable、drain、data、end、close等事件。 每次读入或者写入一段数据，就会触发data事件，，全部读/写完毕，触发end事件，读写错误，触发error事件
        - nodeis中部署了steam接口的对象
            - http
            - fs
            - tcp
            - process.stdin  process.stdout
    2. 可读数据流
        - Stream接口分三类： 可读、可写、双向数据流[可读也可写]（tcp sockets zlib crpto）  
        - stream模块的Readable对象，的可读实例， 可以通过push添加数据输入缓存，rs.push(null) 告诉rs实例输入完毕。
        - ‘可读数据流’有两种状态： 流动态 和 暂停态。流动态下， 数据会尽快地从数据源导向程序；暂停态，必须调用stream.read（）指令可读数据流才会释放数据。新的可读数据流处于暂停状态。
            - 暂停态 ---> 流动态
                1. 添加data事件监听函数
                2. 调用resume方法（resume重新开的的意思）
                3. 调用pipe方法将数据发送一个可写数据流
                转为流动态时，没有data事件监听函数也没pipe方法的目的地，数据将丢失。
            - 流动态 ---> 暂停态
                1. 不存在pipe方法的目的地时，调用pause方法
                2. 存在pipe方法的目的地时，移除所有data事件监听函数，且调用unpipe方法，移除所有pipe方法目的地
        - 如何读取可读数据流
            - pipe(process.stdout)
            - readable对象监听data事件
            - readable对象监听 readable事件, readable事件表示缓冲中有可读数据，使用read方法读取，没数据可读，返回Null
            - 可读流数据 的方法
                - readableStream.read() 读取缓存数据，没数据可读返回nuLl
                - readableStream.pause() 暂停数据。
                - readableStream.resume() 恢复数据流
                - readableStream.unpipe() 从管道中移除目的数据流
        - 可读数据流的属性和方法
            - readable属性
            - read方法， 可以指定特定字节数，位指定则返回缓存的所有数据
            - _read() 将数据**放入**可读数据流
            - setEncoding() 指定数据流返回的编码
            - resume() 将可读数据流 继续 释放 data事件，即转为流动态
            - pause() 停止释放data事件，进入暂停态
            - isPaused() 可读数据流被客户端手动暂停了（调用pause方法）
            - pipe() 自动传输数据的机制，src.pipe(dst)   src必须时可读数据流，dst必须是可写数据流
        - 事件
            - readable事件 向外提供数据时触发
            - data事件 会将数据流切换到流动态
            - end事件 当数据读取完时，触发end事件
            - close事件 数据源关闭时，close事件触发
            - error事件 读取数据错误触发
        - 继承可读数据流接口
            - 可读数据流分 两种模式： 
                - pull 自己从数据流读取数据就是pull模式； read() 方法体现的就是pull模式
                - push 监听了data事件， 就会自动激活push模式；
            - util.inherits(myObj, Readable)
        - fs模块的读数据流
            - fs.createReadStream() 创建一个读取数据的数据流
    3. 可写数据流
    - 可读数据流，用来对外输出数据；可写数据流，用来接收数据，允许将数据写入目的地。不同的数据目的地部署了 可写数据流接口后，可以使用统一方法写入。
    - 部署了可写数据流的场合：
        - http requests
        - http responses
        - fs write streams
        - zlib streams
        - crypto streams
        - child process stdin
        - process.stdout, process,stderr
    - stream.write() 将数据写入可读数据流， write(payload, callback), 一旦缓存中的数据释放，就会调用callback
    - readableStream.on('data', chunk => writableStream.write(chunk)) 可写数据流写入数据，传入可读数据流
    - stream.end(str,encoding, finishCallBack) end方法用于终止可写数据流，三个都是可选参数，第一个是结束时要写入的数据
    - cork() 强制写入
    - 事件
        - drain事件， drain排水的意思。 缓存数据全部完成写入，继续写入时，会触发drain事件，表示缓存空了。 可以用于写入条件判断
        - finish事件 调用end方法时触发该事件
        - pipe事件 可写数据流监听pipe事件，可读数据流将数据流导向写入目的地时，触发该事件、
        - unpipe事件
        - error事件
    4. 转换数据流
    - 含义： 转换数据流 用于 将 可读数据流释放的数据 转换成另外一种格式， 然后再发给可写数据流
    5. 使用pipe处理数据流的时候，必要使用错误处理机制，即使用on监听error事件
        - 写入数据要注意，要是被中断，收不到close事件，一直处于等待状态，会造成内存泄漏，所以需要用**on-finished模块**来处理，读取完后将
        stream.destroy()
### Express框架
### Koa框架
### MongoDB应用
 