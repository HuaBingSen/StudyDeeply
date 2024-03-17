### webpack官方文档学习
#### 概念
- preface
    - 应用于javascript程序的静态模块打包工具。提供一个或者多个入口，将项目中所需每个模块组合成一个或者多个压缩文件。
     v4.0.0开始，不再引入webpack配置文件，但是 建议使用配置文件，因为有着高度可配置属性，同时webpack配置文件优先于默认webpack配置（内部默认的配置）
- mode
    - 模式，指明webpack生效环境？有 development、production、none三个可选参数，默认是production
- enry points
    - entry属性，指定webpack应该使用哪个模块作为构建打包的入口文件，默认入口文件时`./src/index.js`,可以指定一个或多个入口 
    - `entry: string | [string]`; 如果是通过plugin生成入口文件，则entry可设置为 {}空对象； 同时entry的对象属性写法可以有很多扩展空间
- output
    - output属性，指明 webpack打包的内容输出到哪里，以及如何命名。 主要输出文件默认值时`./dist/main.js`
    - 配置只能指定一个output配置，但若是多入口文件则可以通过替换符确保output的不同文件的名字唯一性
    - 多entry下，则应注意使用subsitutions替代符，生成output的filename,以确保打包的多个文件的唯一性。 关于subsitutions规则webpack内置了一个模块处理，规则可以分为单入口静态输出文件名，在不同层面上提供了不同的替换符：compile-level、chunk-devel、module-level、fine-level、 url-level
- loader
    - webpack开箱即用功能只能处理 javascript 和 json文件，loader 模块则让webpack能够处理其他类型文件，转换为有效模块
    - 使用： module: `{ rules: [{test:/\.test$/, use: 'raw-loader'}]}` 注意：在module属性下书写，是rules多个规则，每个规则都是json，test是检测到的文件类型，use是使用什么模块去处理， use的值可以是字符串，也可以是一个包含各个loader模块的数组，表示对一种类型的文件使用多种loader 【当然use的模块都是需要安装使用的】
    - webpack读取方式：右到左，下到上(反人类的读取方式)， loader也支持链式调用，及同步或者异步
- plugin
    - 关于plugin插件，webpack提供许多开箱即用的，不同于loader
    - 作用：打包优化、资源管理、注入环境变量等
    - 使用： require() 插件，添加到plugins数组中，htpm-webpack-plugin插件为应用程序生成一个html我呢见，并自动将生成的所有bundle注入此html中
- 浏览器兼容性（browser compatibility）
    - webpack支持es5标准的浏览器，不支持ie8以下。想支持旧版本浏览器，还需要使用es6表达式
- configuration
    - 基本配置 运用commonjs导出， 默认导出exports对象，也可以导出函数，promise对象，及数组（包含多个配置对象）
- modules
    - webpack模块，支持很多导入/导出方式， **es6的import , commonjs的require, amd define 和 require, css/sass/less 中的@import, styleshet url() 或者 <img src=... />**
    - 支持的模块类型
        - ESMAScript模块
        - commonjs模块
        - AMD模块
        - Assets （静态文件）
        - WebAssembly模块（web层面的汇编，低级的汇编语言）
    - 常用的loader
        - cofferscript
        - typescript
        - esnext
        - sass less stylus
- module resolution
    - webpack使用的是enhandced-resolve来解析文件路径的， 能解析三种路径（绝对路径【服务器层面，本地层面】，相对路径，模块路径）
    - 解析loader除了按照webpack默认的规范，还可以使用resolveLoader配置独立解析规则
    - resolve模块有非常丰富的路径匹配设置，最常用的是resolve.alias, 是一个对象，可以指定别名为固定路径，得以引用文件简约路径
    - watch模式，用于模块解析缓存， watch: true,   webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启。
    watch还可以用选项定制，属性名就叫watchOptions：{}
- module federation **关于这个概念，个人目前水平还不够理解！！！**
    - 微前端的概念，可以单独开发部署某些独立的构建，这些构建又组成了应用程序
    - 用例：
        - 每个页面单独构建
        - 组件作为容器
- dependecy graph
- target
    - 指明webpack处理的的javascript执行环境，node还是web， 通常是一个字符串 target: 'node'，也可以多target配置：设置两个独立配置
- manifest
    - manifest数据： 浏览器运行过程中，webpack用来连接模块化应用程序所需的代码，包含： 模块交互时，连接模块所需的加载和解析逻辑。
    - 使用output设置的contentHash作为bundle文件的名称，可以来使得浏览器根据文件名是否变动来决定是否使用缓存，即使某些内容没改变，hash还是会改变，这是因为注入的runtime和manifest在每次构建后都会发生变化，所以单独只用contentHash并不能解决打包缓存的问题，这里需要用 **分离manifest去解决缓存问题**
- hot mudule replace
    - webpack-dev-server模式下支持热更新和热替换模式简称热更新）
- webpack advantages
    - 讲述了前端的发展历史，从web page开发到 web engineering的过程。
    html引入js脚本 -> 立即调用函数封闭作用域 + IIFE所产生的Grunt等工具（将项目文件拼接一块作流处理） -> node.js诞生 + javascript模块（commonjs）
    + npm + modules+ ES6 创建了大前端环境
    - 现在是简单项目 到 复杂项目 但可服用性 且 可操作性 及 功能都高了很多， 未来会不会再从复杂到简单？除非前端底层彻底革命
    - webpack的缺点是什么？【使用太少，没有体会而发言】
- how it run inner
    - 
### 配置
- 通过webpack webpack-cli构建项目
- 优化 Optimization配置
- DevServer
- Cache
- Devtool
- Externals
- Performance
- Node
- Stats对象
- Experiments
### API
- 