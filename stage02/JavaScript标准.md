### 浏览器环境
- 浏览器核心： 渲染引擎 + JavaScript解释器（JavaScipt引擎）
- 主流浏览器渲染引擎：
    > FireFox: Gecko  
    > Safari: Webkit  
    > Chrome: Blink  
    > IE: Trident  
    > Edge: EdgeHTML --> Blink
- 渲染引擎处理过程：
1. 解析代码 HTML代码解析为DOM, CSS代码解析为CSSDOM
2. 对象合成：DOM  CSSDOM合成一棵渲染树
3. 布局： 计算出渲染树的布局
4. 绘制： 将渲染树绘制到屏幕
- 重流和重绘 
    - 重流：
        1. 含义： 元素大小、位置发生变化都会重新计算渲染树，页面要进行重新排版工作，叫重流也叫重排；  
        2. 触发因素：添加删除dom,  dom大小（内边距，外边距，边框厚度，宽高灯几何属性）和位置改变， 获取某些属性值(offsetTop一系列，scrollTop一系列)
    - 重绘：
        1. 含义：元素外观发生改变出发的行为。比如背景颜色，文字颜色，边框颜色等

- 减少重绘和重拍
    1. 批量操作dom
    2. 缓存 DOM 信息。
    3. 不要一项一项地改变样式，而是使用 CSS class 一次性改变样式。
    4. 使用documentFragment操作 DOM
    5. 动画使用absolute定位或fixed定位，这样可以减少对其他元素的影响。
    6. 只在必要时才显示隐藏元素。
    7. 使用window.requestAnimationFrame()，因为它可以把代码推迟到下一次重流时执行，而不是立即要求页面重流。
    8. 使用虚拟DOM（virtual DOM）库。
- history对象
    - back(), forward(), go(), pushState(), popstate事件：用户点击浏览器倒退按钮和前进按钮，或者使用调用back go forward三个方法才会触发； replaceState()用来修改history对象的当前记录
- cookie
    - 含义：cookie是服务器保存在浏览器的一小段文本信息，大小一般不超过4kb。 浏览器每次向服务器发送请求，就会附带上cookie信息。
    - 作用：主要用来分辨两个请求是否来自同一个网站，及保存一些状态信息。
    - 场合：
        1. 对话管理(session): 保存登录、购物车等需要记录的信息
        2. 个性化：保存用户偏好设置如网页字体大小背景等
        3. 追踪：记录和分析用户行为
    - cookie组成
        key value 到期时间：Expires   所属域名 生效路径
    - 用户访问某个网址，服务其会在浏览器写入cookie，cookie包含这个域名及其根路径 /, 该cookie对该域名及其所有子路径有效
    - 域名和端口相同即可共享cookie,不需要协议相同
    - cookie的一些属性
        1. Expires 和 Max-age
            - Expires是一个具体的到期时间，UCT格式，由于系统本地时间是不确定是否一定精确，所以没法保证cookie一定在服务器指定时间国企
            - Max-age ,指cookie从现在开始存在的秒数，其优先级高于Expires，这也是合理的。
            - 不设置Expires和Max-age则为Session Cookie，只存在本次对话，一旦浏览器关闭，不会保存cookie
        2. Domain,Path属性
            - 指定哪个域名要带上这个cookie, 以及哪些路径要带上cookie
        3. Secure, HttpOnly
            - Secure https加密协议下才将cookie发送到服务器
            - httpOnly指定该cookie无法通过JavaScript操作拿到脚本
        4. SameSite 【是否来自同一站点】
            - chrome51 版本后添加了这个cookie属性
            - 用来限制第三方cookie,从而减少安全风险
            - 有三个值选项可设置
                1. Strict    Set-Cookie: CookieName=CookieValue; SameSite=Strict  跨站点时，任何情况都不会发送Cookie, 只有与当前网页得URL与请求目标一致，才会带上Cookie. **过于严格，可能会造成不非常不好的用户体验，比如同个域名下不同ing页面跳转，登录失效**
                2. Lax 较宽松， 大多数情况不发送第三方cookie，导航到目标网址的Get请求除外：
                链接 <a href="..."></a>，预加载 <link rel="prerender" href="..."/>，Get表单 <form method="GET" action="...">	
                3. None
                设置为该值，同时必须设置Secure
- 同源策略
    - 限制范围：无法读取非同源网页得cookie、localStorage、IndexDB;  DOM 和 JS对象无法获得; 无法发送AJAX(可以发送，但浏览器会拒绝)
    - 解决跨域页面通信手段
        1. json 跨域
        **早期方案**
        利用img script标签不受同源策略影响来实现，是前端和后端一起配合实现，前端传一个那边定义的回调函数放在script的url中的参数里，在接受到服务器返回的res后执行回调，JSON.stringify响应内容。
        优点：兼容性号，在请求完毕可以立即调用回调函数获取结果
        缺点：只支持get请求，且需要后端配合，且不能解决两个页面之间如何进行JavaScript调用的问题
        2. document.domain + ifreame
        **主域相同，子域不同**
        a 通过iframe嵌套 b, 且 a 和 b都要设置 document.domain为同一域名。 b就可以通过window.parent读取a中的内容 【只限主域名相同，子域名不同场景】
        3. location.hash + iframe
        **主域不同，通过中间页面及iframe嵌套实现**
        原理：a和b不同域（主域名都不同），通过中间页c来实现， a 利用iframe的location.hash来传值给b(单向)，同时在js中开放一个回调函数给同域的c;  b在js中通过window.onhashchange事件监听接受a传来的值，同时将从a接收来的值传给c; c监听b传来的hash值，通过在onhashchange中通过操作同域名a的js回调，将结果传回去
        a.html: `http://www.domain1.com/a.html` 1.a嵌套 2.b,将值通过iframe的hash传到b
        b.html `http://www.domian2.com/b.html`  2.b嵌套 1.c 通过onhashchange得来的值给c,或者将自己想传得值传给c
        c.html `htpp://www.domain1.com/c.html`  1.c不用嵌套  因为和1.a同域， 且 经过层层嵌套（a -> b -> c） ,可以直接通过window.parent.parent操作1.a中的回调js，将结果传回
        4. postMessage跨域 + iframe
            - 含义：HTML5 XMLHttpRequest 2版本中的API，为数不多可以跨域操作的window属性；
            - 场景：
                1. 页面喝其他打开的新窗口的数据传递
                2. 多窗口之间消息传递
                3. 页面与嵌套的iframe消息传递
            - postMessage(data, orgin)
            - a 嵌套 iframe b, iframe.onload的回调中，向b传送数据： iframe.contentWindow.postMessage(JSON.stringify(data), 'htttp://wwww.bbb.cmo'); 同时添加事件监听 message事件，接收bbb传来的数据； b中事件监听接收传递的数据，同时也可以传数据给b
        5. window.name + iframe
        6. 跨域资源共享（CORS）[cross-orgin resource sharing] **最常用的跨域方式**
        - 含义：W3C的一个标准，跨域资源共享，允许浏览器向跨域的服务器发出XMLHttpRequest请求
        - 分两种请求：简单请求 和 非简单请求
            1. 简单请求：（1）HEAD, GET, POST中的一种 （2） HTTP头信息不超过xxxx, 简单描述：简单的HTTP方法和简单的HTTP头信息的结合
            *历史原因：表单历史上一直可以发出跨域请求，简单请求就是表单请求，浏览器沿袭传统不复杂化
            Access-Control-Allow-Origin: http://api.bob.com , 该字段必须设置，是 * 或者指定域名
            Access-Control-Allow-Credentials: true， 可选， 表示服务器明确许可，浏览器发送请求可以携带cookie； **如果需要携带cookie请求，则服务器和浏览器端都要设置**，否则只需要服务端设置
            前端开发在AJAX中打开 xhr.withCredentials = true |  axios.defaults.withCredentials = true
            2. 非简单请求
            - 请求方法为PUT或者DELETE,  或者Content-Type字段是application/json。
            - 过程： 预检请求， 浏览器询问服务器，当前域名是否在服务器 许可名单范围，响应返回 检查 Origin、Access-Control-Request-Method和Access-Control-Request-Headers，这三个字段，浏览器网页可以通过 Access-Control-Allow-Origin字段是否包含浏览器网页发出的的域名判断预检请求是否同意，否定可以被XMLHttpRequest对象的onerror回调函数捕获;  预检请求被通过，则 浏览器后面发出的发出请求都和简单请求一样，会有Origin头信息字段
        7. nginx代理跨域
            跨域原理：同源策略是浏览器的安全策略，不是HTTP协议的一部分，服务端调用HTTP接口不会触发同源策略，不存在跨域问题
            实现思路：nginx配置一个代理服务器（域名和domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以修改cookie种的domain信息，可以实现跨域登录
        8. Nodejs中间件代理跨域
        与Nginx原理相同，都是开启一个代理服务器，实现数据转发，方便接口登录认证
        方式： node + express + http-proxy-middleware搭建一个proxy服务器 （用于非vue框架）
        node + webpack + webpack-dev-server vue框架跨域
        9. websocket协议跨域， wesocket procol是html5新协议，比原生好用，可以使用Socket.io
- Mution Observer API用来监视DOM任何变动。
    - 节点增减、属性变动、文本活动内容变动，都可以得到通知
    - DOM变动就会触发Mutation Observer事件，但他是 异步触发的，等到当前所有DOM操作都结束才触发，是为了考虑性能问题，防止频繁触发事件
    - 特点：等待所有脚本任务完成后，才运行（异步触发）； 把DOM变动记录封装成了数组处理；
    - const observer = new MutationObserver(callBack);  创建实例
        - callBack(mutaion, observer) { } // 变动数组mutation, 观察器实例
        - 实例方法
            1. observer(dom, options) ;  options = {
                childList: true, // 子节点变动
                attributes: true, // 属性变动
                characterData: true // 节点内容或文本变动
            } 还有其他观测配置选项属性
            2. disconnect() 停止观察； takeRecords(); 清除变动记录； 
- ArrayBuffer对象，Blob对象
    - ArrayBuffer对象代表二进制数据的一段内存，不能直接读写，要通过视图(TypeArray和DataView这两个视图)来写。 const buff = new ArrayBuffer(32)
        - DateView(buff);   DateView视图是一组构造函数，代表不同的数据格式
        - ArrayBuffer用于操作内存
    - Blob对象
        - 含义：全称 Binary Large Object(二进制大型对象)，表示一个二进制文件的数据内容，通常用来读写文件
        - 构造方法 `new Blob(array, options)` options可选， array 包含的是二进制对象或者字符串
        - 实例属性，size和type,及 实例方法slice()
        - 文件对象，Fuile实例对象是一个特殊的Blob实例，包含blob实例属性size和type; 请求可以指定响应类型为blob； URL.createObjectURL(),针对Bolb对象生成的一个临时URL，以便于某些API使用【拖动图片生成URL方便用户预览】
        - 读取文件，即读取Blob对象内容，通过FileReader对象，有四个方法
            - FileReader.readAsText() 返回文本，需要指定文本编码，默认UTF-8
            - readAsArrayBuffer()
            - readAsDataURL()
            - readAsBinaryString()
- Wbe Worker
    - 背景：JavaScript语言是单线程模型，任务只能同步阻塞处理，虽然通过异步回调来实现了任务的异步处理，但随着电脑计算能力增强，多核CPU出现，单线程带来很大不便，无法充分发挥计算机的计算能力，**Web Worker就是给JavaScript创造多线程环境**，
    **允许主线程创建Worker线程，将一些任务分配给Worker线程，在后台与主线程同步运行，互不干扰。**等Worker线程完成计算任务，再把任务结果返回给主线程。 好处， 计算密集型或者 高延迟得任务可以交给Worker线程执行，主线程负责UI交互能够保持流程，不会被阻塞(也就是优化了前端首屏加载体验)
    - Web Worker使用注意点
        1. 同源限制  
            - Worker加载的脚本文件，必须和主线程的脚本文件同源
        2. DOM限制   
            - 其全局环境与主线程不同，且不能读取主线程网页的DOM
        3. 全局对象限制 
            - Worker线程所在环境，只能使用navigator对象和location对象，且很多接口拿不到
        4. 通信
            - 主线程和子线程（Worker）不在同一个上下文，不能直接通信，只能通过消息事件来完成
        5. 脚本限制
            - Worker线程不能alert和confirm方法，单能使用XMLHttpRequest对象发送AJAX
        6. 文件限制
            - Worker线程无法读取本地文件（file://），所加载的脚本必须来自网络
    - 基本用法
        1. cosnt worker = new Worker(jsUrl, options); options配置对象中的name属性可设置worker的名称，用来区分多个worker线程。
            - 实例方法有以下
            - onmessage() 指定message事件的监听函数，发送过来数据在Event.data中
            - poestMessage() 向Worker线程发送消息
            - terminate() 终止Work线程
            - onerror() 和 onmessageerror()
        2. 主线程中
            worker.postMessage()向worker发送消息， onmessage() 接收子线程发回来的消息， Worker完成任务后，
            主线程可以关掉它，worker.terminate()
        3. Worker线程内部
            - 一些全局属性和方法
            - self.name  Worker的名字，只读的
            - self.posetMessage()
            - self.onmessage()
            - self.onmessageerror() 发送的数据无法序列化成字符串，会触发该error事件
            - self.close() 关闭worker线程
            - selft.importScripts() 加载JS脚本
        4. 数据通信
            - 主线程和Woker线程之间，通信内容可以是文本，也可以是对象，是拷贝关系，浏览器是将其序列化再解序列化
            - 拷贝发送二进制数据，如果数据太大，会有性能问题！**允许主线程将二进制数据转移给子线程，转移后主线程无法使用该二进制数据**， 目的是防止多个线程同时修改数据。转移方法叫 Transferable Objects， 对处理映像、声音、3D运算就很方便
            `worker.postMessage(arrayBufer, [arrayBuffer])`
        5. Worker应用实例
            - Worker线程轮询  浏览器轮询服务器，第一时间得到状态改变
            - Worker线程内部新建Worker，只有FireFox支持