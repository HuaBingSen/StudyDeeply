### 代码健壮性如何保证
1. 异常处理
- 使用 try catch 捕获运行时异常
- 处理意料之外的全局运行时异常：js 运行出错，window的error事件，图片加载失败出发error
- 异步代码 的promise的reject处理
- 用axious时，接口报错通用处理（拦截器中加）
- vue 异常处理
2. 输入检查
- 接口返回格式检查
不能保证后端接口的返回数据格式一定正确  
`const res = await fetchList()`  
`const list = res.map(...)`  
如果不是数组呢？程序会报错，虽然是后端的问题，但还是可以前端预防改为 `const list = Array.isArray(res) ? res.map(...)`
- 函数参数检查（推荐使用Ts,有类型限制）,没用ts则可以对参数做类型判断
3. 第三方库选择：选择稳定的，使用人数多的。

### ES6回顾（promise, 数组方法，字符串方法，正则）
- 数组方法原型上的方法（接口）：
  - arr.push()  尾部插入，返回值为新数组的长度
  - arr.pop()   尾部删除，返回值为删除元素
  - arr.shift() 首部删除，返回的是删除元素
  - arr.unshift() 首部插入，返回的是新数组长度  
  - arr.splice(start, deleteCount, item1, tiem2, itemN) 可以实现：插入，删除多个元素  
    返回值为包含删除的元素的数组，该方法改变的是原数组
    只有start参数则是删除从start开始之后的所有参数（包含start）  
    start可以是负数，-n 表示从倒数第几开始  
    添加则deleteCount为0，后面item为添加的元素
  - arr.concat(value0, value1, valueN)  
    拼接数组，或者值，可拼接一个或者多个  
    arr.concat() 无参数，会直接返回一个源数组的浅拷贝的数组
    返回值是拼接的新数组  
    Array.from(arrayLike, mapFn, thisArg)
  - **str.split(separator, limit)**   split是字符串的方法，字符串切割为数组
  - arr.join(seperator)  数组以seperator分隔为字符串
  - arr.sort() 将元素转为字符串，然后按照UTF-16值升序，不实用
  - arr.reverse() 将数组翻转，返回值是翻转后的数组，原数组改变
    toReversed()方法也是翻转数组，但不改变原数组
    - Array.prototype.slice(start, end) 提取（截取）起始索引处(包含)到结尾（不包含）返回新数组的浅拷贝
    - arr.forEach(callBackFn)  callBackFn(element, index,array), 会改变数组本身，没有返回值
    - arr.map(callBackFn)  callBackFn(element, index,array), 返回新数组，不会改变数组本身
    - arr.filter(callBackFn) callBackFn(element,index) callBackFn返回真值, filter返回过滤的数组
    - arr.every(callBack) 返回true or false  要么全通过，要么全不通过
    - arr.some(callback) 满足一个条件则返回true
    - arr.reduce(callBackFn, initialValue)  callBackFn(accumulator, currentValue, currentIndex)  initialValue 第一次回调时初始化的值
    应用：
    - 累加
    - 统计数组中每个元素出现的次数  
    重点再intialVlalue设置为{},累加器初始化为{}，currentValue是否在{}出现过，是
    的话该值为key,其value+1,否则其值初始化为1
    - 数组去重  
    intialValue设置为[],  includes() concat()
    - 多维数组转化为一维数组， 递归  
    注意都要在callBackFn中将执行结果return不然下一次执行没有上一次累加器的结果
    - arr.includes(element)   false true
    - arr.indexOf(element)    返回该元素下标或-1
    - Array.from() 将类数组转化为数组   引申  new Set(Array.from(arr)) 可以数组去重
    - 数组去重：reduce  ， 用个空数组+遍历看是否在空数组中出现过没出现则push(用includes方法，能判断NaN),  
    filter + indexOf  indexOf无法判断NaN
    - Object.keys(obj) 获取对象keys的一个数组   Array.prototype.keys()  获取数组下标的数组
    - Object.values(obj)   Array.prototype.values()
    - Object.entries(obj) 获取对象的key和value   返回结果  [ [key, value], [key, value], ...]  
    `for (const [key, value] of Object.entries(object1)) {
        console.log(`${key}: ${value}`);
    }`
    - str.startWith(searchString, position) 字符串是否以什么开头，position为从何处开始查找
    - str.endsWith(searchString, position) 
- 遍历数组的方法  
    1. `for( let i = 0, length = array.length; i < length; i++ ) { // do something }`
    2. `for (const element of array) { }`
    3. es6的 map方法，返回一个新数组 (可重新格式化数组中的对象) 
    `array.map( (element, index, array) => {}, thisArg)`  
    4. while 循环， 正向循环和逆向循环
    5. forEach(callBack,thisArg)  
    注意：for in 循环不太适合数组遍历，遍历的属性值是字符串，遍历的是对象的枚举属性，包括自身属性及  
    原型链上的属性
- 遍历对象的方法  
    1. for...in 可遍历对象的所有可枚举属性，包括对象本身的和对象继承的属性  
    2. Object.keys(obj) 可遍历对象本身的所有可枚举属性，返回值是数组  
    3. Object.values(obj) 
    4. Object.entries(obj)  返回值是一个嵌套数组(配合for...of使用)，包含Key和value 
    5. Object.getOwnPropertyNames(obj)  遍历对象的所有属性，包括不可枚举属性  
    6. Object.getOwnPropertySymbols(obj)  获取对象上的Symbol属性，返回值是数组  
    7. Relect.ownKeys(obj)  
- 对象的 defineProperty()和defineProperties()  
    - Object.defineProperty(obj, prop, descriptor)  ,返回值是传入函数的对象  
    - 通过赋值添加的普通属性会在枚举时出现，且可被删除(delete obj.a),默认情况下，defineProperty()定义的属性不可写，不可枚举，不可被删除 
    - 属性描述符（descriptor）：数据描述符，访问描述符  
    - 数据描述符  
        1. configurable  默认为false, 为false时，该属性不可被删除； 该属性的类型不能在数据属性和访问器属性之间更改；其描述符的其他属性也不也能被更改（writable除外）  
        2. enumerable 是否可枚举(遍历的时候是否会出现)，默认为false  
        3. value 默认是undefined  
        4. writable  是否可写（更改）默认false  
    - 访问描述符  
        1. get  getter()
        2. set(value) {}  setter()
- 字符串原型上的方法  
    - 获取字符串长度   length属性  
    - 获取指定位置的值  
        string.charAt(index) 获取指定位置的字符的值
        string.charCodeAt(index) 获取指定位置的字符的Unicode的值  
    - 检索字符串是否包含特定序列（字符或者字符串）
        indexOf(char) 返回数组中第一次出现给定元素的下标，不存在返回-1  
        lastIndexOf(char) 和上述相反，逆序查找  
        inludes(searchString, position) 
        startsWith(searchString, position)  
        endsWith(searchString, position)
    - 截取字符串  
        - slice(start, end)
        - substring(start, end) 和上面这两个方法，都是取start,不取end  
    大小写转换
        - toLowerCase() 字符串转为小写  
        - toUpperCase()  
    连接字符串
        - str.concat(str1, str2, ...)
    字符串模式匹配  
        - str.replace(pattern, replacement) pattern 可以是字符串也可是正则  
        - str.match(regexp)  
        - str.search(regexp)  
    移除字符串首尾空白符  
        trim()  trimStart() trimEnd()  
    获取字符串本身  
        valueOf()  valueString()  
    重复字符串  
        repeat()  
    补齐字符串长度  
        padStart(fillLength, fillString) 头部补齐，补在头部前面  
        padEnd(fillLength, fillString)  
    字符串转为数字  
        parseInt(string, radix)    redix为2-32的进制  
        parseFloat(string)
- 正则表达式  
    - 单个字符 \n 换行   \s  空白符
    - 多个字符  
        . 除了换行符之外的任何字符  
        \d 单个数字[0-9]  
        \D 除了[0-9]  
        \w  包括下划线在内的单个字符， [A-Za-z0-9]  
        \W  非单字字符  
        \s  匹配空白字符，包括空格、制表符、换页符、换行符  
        \S  匹配非空白字符  
    - 循环与重复 
    0 | 1  ?   0次或者1次   /colou?r/ 匹配 color和colour  
    - / > = 0 * 0次或者无数次  
    - / >= 1 + 至少出现一次  
    - 特定次数  {}确定次数   /a{2,5}/ a出现至少2次，最多5次，也可以是固定次数写一个  
        {x} {min, max} {min,} {0,max0}
    - 位置边界  
        单词边界  \b    /\bcat\b/  匹配cat这个单词  
        字符串边界  ^ 开头  $ 结尾  
        /m 多行模式(mutiple of lines)  /g  全局模式（global） /i  忽略大小写（ignore case, case-insensitive）
    - 子表达式  
        分组 ()  
        引用回溯 \1 引用的第一个子表达式 \2 表示第二个引用的子表达式  $1 ，$2表示要替换的字符串
- ES6学习
    - ESMAScript6
        - 2011年发布ES5.1以后开始制ES6.0版本  
        - Balel转码器将ES6一些新的写法转化为ES5的写法，以兼容老版本浏览器；配置文件 .babelrc设置转码规则和插件  （官方提供可手动命令行安装）
        - @bable/node 提供支持ES6的REPL环境，可直接运行ES6  
        - @bable/register 改写require命令，对.js .jsx .es .es6后缀文件进行转码  
        - Bable默认只转换新的JavaScript句法，不转换新的API,需要 core-js和regenerator-runtime
    - JavaScript的模块化历史 ：CommanJS AMD
        - 早期简单脚本语言，后面业务复杂发现代码变量等容易混乱--全局变量污染问题，需要模块化，nodejs的发展极大促进了 commonjs的发展 
        - CommanJS: 
            - 定义模块：每个文件都是一个模块，每个模块都是一个单独的作用域，该模块内部的变量无法被其他模块读取，除非定义为global对象的属性  
            - 模块输出：模块只有一个出口，module.exports对象，把模块要输出的内容放入此对象中即可 
            - 加载模块： require 读取一个文件并执行
            - 优点：解决依赖、全局变量污染问题  
            - 缺点：同步加载，对浏览器模块加载慢，合理方案是异步加载，由此引出AMD(异步模块定义)  
        - AMD 异步模块定义 require([module], callback)  
        - require.js 解决一下两个问题  1. 加载多个js 导致网页dom解析暂停（渲染暂停），失去响应时间较长；2. js 存在依赖关系，就必须保证加载顺序，很麻烦；  
        - 使用require.js 引入require.js `<script scr="js/require.js" data-main="js/main" defer async="true">` 设置主入口模块  
        - main.js中 require(['module1','module2', 'module3'], function(m1,m2,m3){ // do something})   require.config能设置指定路径  
        - 模块不依赖其他模块，则可以直接定义再define() 函数中， 如果依赖其他模块，则第一个参数必须是数组，指明依赖得模块  
    -   Set  
        - 类似数组，但特性是：成员值是唯一的，没有重复值  
        - new Set(element)  参数elment是一个数组或者是有iterable接口的其他数据， 数组去重 [...new Set(array)]; 
          字符串去重 [...new Set(string)].join('')  
        - Set结构内的值不会发生类型转换，其原理是类似 === 精确运算符  
        - 属性：constructor,size获取成员总数  
        - 方法：  
            - 操作方法（四个）  
                1. add(value)  添加某个值，返回Set结构本身  
                2. delete(value)  返回布尔值，表示是否删除成功  
                3. has(value)  是否含有某个成员  
                4. clear() 清除所有成员，没有返回值  
                - Set结构数据为 {1，2，3}， 可以转化为数组结构， Array.from(SetInstance)  或者 [...SetInstance]  
            - 遍历方法  
                1. keys()  返回键名的遍历器（是Set结构）  
                2. values()  返回键值的遍历器 (是Set结构)  他的键和值是同一个
                3. entries()  
                4. forEach()
                5. for...of 可直接用，拿去遍历Set结构  
                6. new Set([...setInstance].map())   把扩展运算符...和new Set() 结合，即可让set使用数组方法 map filter 等等数组方法，可以很容易实现**并集(Union)** ...放在一个数组里 new Set([...setA, ...setB])、**交集(Intersect)**  new Set([...setA].filter(x => setB.has(x)))  、
                **差集(Difference)**  new Set([...setA].filter(x => !setB.has(x)))  
                7. 遍历过程中**改变Set结构**，没有直接方法，有两种变通方法，  1. `new Set([...setA].map(val => val*2))`  
                或者 2. `new Set(Array.from(setA, val = > val*2))`
    -   WeakSet  
        1. 成员只能是**对象**，不能是其他类型  【也是不重复值得集合】
        2.  WeakSet中的对象都是弱引用， 垃圾回收机制不考虑WeakSet对该对象的引用，这个用处能解决使用某些值后忘记取消引用，导致内存无法释放导致的内存泄露问题。javascript本身的垃圾回收机制是依赖引用计数的，一个值的引用次数不为 0，垃圾回收机制就不会释放这块内存。WeakSet适合存放临时对象  
        由于以上弱引用特性，**WeakSet的成员不适合引用，会随时会消失，其内部成员个数取决于垃圾回收机制有没有运行，不可预测，所以WeakSet不可遍历**  
        3. new WeakSet(IterableObject)  **IterableObject的成员会自动成为WeakSet的成员（成员必须为对象，才能进入WeakSet）** 
        4. add(val) | delete(val) | has(val) WeakSet有三个方法
    -   Map  
        1. 类似Object, 是键值对得集合，但是更加完善，他的**键可**以是**任意类型值**，而JavaScript的对象只能是“字符串-值”    
        2. Map结构内添加成员，有以下两种方法
            - set方法： mapInstance.set(key, value)   set方法可设置键为任何值（包括对象）  
            - 接受数组作参数： new Map(arrayKeyValue) ; 参数 arrayKeyValue 是一个数组，其成员是一个个表示键值对的数组   `[ ['name', '张三'], ['age', 14]]`
            - 接受任何有迭代接口、且每个接口都是一个双元素的数组的数据结构  , Map()可接受 Set和Map的实例作为参数去生成Map实例
                `const set1 = new Set([ ['name', '张三'], ['age', 14] ])`  `const map1 = new Map(set1)`  
                `const map2 = new Map([ ['name', '张三'], ['age', 14] ])`  `const map3 = new Map(map2)`  
        3. 连续赋值，最后一次会覆盖前面的； **只有对同一对象的引用，Map结构才将其视为同一个键！**  , Map的键就是跟内存地址绑定的  
        4. 属性和操作方法  
            - size 获取大小。返回成员总数。  
            - set(key, value) 返回值为Map结构  ； 可连续赋值  const m1 = new Map(); m1.set(1, 'a').set(2, 'b')
            - get(key)  返回value 或者 undefined  
            - has(key)  
            - delete(key)
        5. 遍历方法  
            mapInstance.keys() | mapInstance.values() | mapInstance.entries() | forEach()   遍历顺序就是Map成员的插入顺序 (以上前三个方法，返回的都是maoIterator结构)  
        6. Map和其他数据结构相互转换
            - Map转数组： [...MapInstance]  
            - 数组转Map: new Map([ ['name', 'hbs']])  
            - Map转对象：for of 遍历map实例，创建一个null原型， 遍历过程中把key和value都赋值给null原型  
            - 对象转Map: new Map(Object.entries(obj))
    -   WeakMap  
        - 只接受对象（null除外）作为key值，且weakMap键名指向的对象，不计入垃圾回收机制  
        - 场景：  
            1. DOM节点作为键名 ，值为统计次数之类的，在dom节点上绑定点击事件，回调中统计点击次数  
            2. 部署私有属性  
    - let const  
        - const定义的变量，定义时就要赋值，否则报错； const定义的变量 本质 是引用的指针不可改变，如果是引用类型，则里面的值可以改变  
        - 块级作用域：ES5 没有块级作用域，导致的问题：1. 内层变量覆盖外层变量（变量提升导致）2. 计数的循环变量泄露为全局变量 var let for  
        - 函数声明类似于var,会提升到**全局作用域**或**函数作用域**的头部; 允许在块级作用域内声明函数；函数声明还会提升到所在块级作用域头部；  
        - ES6 声明变量  6种方法： var function let const import class  
    - 顶层对象
        - 浏览器 window | nodejs 中 global | web work 中 self;   ES2020中 globalThis 为 任何环境下的顶层对象
        - ES5中，顶层对象与全局变量等价，导致问题：没法编译阶段报错，不知觉创建全局变量，顶层对象可读写，不利于模块化  
        - ES6中， var 和 function 声明得是全局变量，也是顶层对象的属性；  let、const 声明的全局变量，不再属于顶层对象  
    - 解构赋值用途  
        1. 交换变量 let x = 1, y =2; [x, y]=[y,x]  
        2. 函数返回值返回多个（数组或者对象），在函数外接收时候解构 
        3. 设置函数参数  
        4. 提取JSON数据  let {a,b,c} = {a: 1, b:2, c:3}  
    - 模板字符串中的花括号 { } 中可以放置任何表达式，还能调用函数  
    - NUmber.isInterger(number) 判断数值是否为整数  
    - 函数扩展：
        - 默认参数赋值  function f1(x = 1, y =2) { }
        - rest参数  ...rest解构， 代替arguments, rest参数是一个数组，而arguments 是一个类数组，写法会简洁很多； **rest参数后面不能有其他参数**  
            function a(x =1, ...rest) { }  
        - 箭头函数：
            1. 只有一个参数且，返回值只有一个不是对象，则可以 括号和 花括号都省略；  
            2. 箭头函数内的this对象，就是定义生效时所在的对象，而不是使用时所在的对象（具名函数是）  】
            3. 不可以使用arguments对象，可以使用rest参数  
            4. 不可以使用 yield 命令  
    - 数组的扩展  
        - 扩展运算符 ... ，可用于数组及Iterator结构  
        - 数组空位，指new Array(3) 只指定长度不指定内容，会有空位，空位没值，不等于undefined, 遍历不到，且esmac对其处理标准不同，尽量避免出现空位  
        - Array.of(val1, val2, val3) 弥补了构造函数 Array()空位问题  
        - fill() 使用给定值，填充一个数组，适合数组数据初始化  
        - find(callBack)  findIndex(callBack) 能识别NaN, 解决了 indexOf的这个不足  
    - 对象的扩展  
        1. 属性的简洁表示法  属性和方法都能简写  {a, hello(){}}  === {a: a, hello: function(){}}  
        2. 属性名表达式  { [propKey]: value }  
        3. super 关键字，指向当前对象的原型对象  
        4. 链式判断运算符， 解决判断某个属性是否能读取到，要先判断该对象是否存在  
            - 旧写法1： const firstName = (name && name.firstName) || 'defaultName';  
            - 旧写法2：三元运算符判断  const fooVal = fooInput ? fooInput.value : undefined;  
            - ES2020引入“链式判断运算符” ?.  左侧是否为null或者undefined,是的话直接返回undefined,否的话往下运算    
            const firstName = name?.firstName || 'defaultName' ;   const fooVal = fooInput?.val  
            - 链式判断运算符写法： obj?.prop   | obj?.[prop] | func?.(...args)  
            - Null判断运算符  ??     let name = fullName?.name || 'default'    || 左边是null或undefined右边才会给默认值，但是空字符串或false或0也会
            ?? 就只有左边是null或者undefined才会返回右侧值，配合链式判断运算符很实用: `let name = fullName?.name ?? 'default'`  
    - Math对象扩展了17个方法： 
        - Math.trunc(number) 可返回小数的整数部分，否则要用Math.ceil(value) 和 Math.floor(value)   
        - Math.sign(number) 判断是正数 负数 零 （返回值有+1  -1 0 0 -0 NaN）  
        - Math.cbrt(number) 算立方根  
        - Math.hypot(number) 勾股定义求值  
    - 对象的新增方法  
        1. Object.is()  ES5 比较两个值是否相等， == 和 === , == 会自动转换数据类型， === NaN不等于自身，+0 === -0,  Object.is()的 NaN 等于 NaN, +0 等于 -0  
        2. Object.assign(target, source) 合并对象，将源对象的所有可枚举属性复制到目标对象，浅拷贝
        3. Object.fromEntris() 逆操作，将一个键值对数组转为对象，所以可以适合将Map结构转为对象，Object.fromEntris(map)  
    - Symbol  
        - 引入原因，ES5的对象的属性名都是字符串，想添加新的内容，很容易冲突，保证每个属性名都独一无二就行了，能解决属性名冲突  
        - let s = Symbol(); 可以在Symbol函数中加字符串参数，作显示区分，在控制台区分  ； symbolInstance.description 或 toString() 或 String() 获取其参数字符串
        - 消除魔法字符串，指出现多次的强耦合字符串，要写成变量， 可以改写 const shapeType = { triangle: Symbol() }  
        - Symbol类型作为属性名，不能被for in, for of, Object.keys(obj), Object.getOwnPropertyNames()返回， 但可以通过Object.getOwnPropertySymbols()获取  
        - Reflect.ownKeys() 可返回所有类型的键名，包括常规键名和Symbol键名  （Symbol作为键名，要加[]）  
    - Proxy  
        1. 含义： 拦截、代理，可以对外界的访问进行过滤和改写。 `new Proxy(target, handler)`  
        2. 让Proxy生效，得对Proxy实例进行操作，而不是针对目标对象进行操作；且 同一个拦截器函数，可以设置多个拦截操作（handler里面可以设置多个操作）  
        3. Proxy支持13种拦截操作： get set has deleteProperty 等等  
            - get 利用get能改写为链式操作函数  
        4. Proxy.revocable() 返回一个可取消得Proxy实例 `let { proxy, revoke } = Proxy.revocable(target, handler)` 
        执行 revoke();  proxy.foo = 1; proxy.foo // 1;  proxy将变得不可访问 proxy.foo出错；  
        - 场景：目标对象不允许直接访问，必须通过代理，一旦访问结束就收回代理权  
    - Relect  
        - Relect， 为了操作对象而设计的API, 设计目的：  
            1. 把Object上得方法都部署到Relect上  
            2. 修改Object方法的某些返回结果，让其变得更合理  
            3. 让Object操作都变成函行为，如 key in object, delete obj[key]  ==== >  Relect.has(obj, key) 和 Reflect.deleteProperty(obj, key)  
            4. Reflect对象的方法和Proxy对象的方法对应
    - Promise  
        - 含义： 异步编程， 是容器， 保存着未来才会结束的事件（一般是异步操作）。  返回的是个对象，可以获取异步操作的信息
        - 特点：(1) 不受外界影响，三种状态：pending, fulfild, rejected  (2) 一旦改变，就不会再变，任何时候都可以得到这个结果  
        - Promise.resove(object)   ,该方法可以将现在对象转为Promise对象，  
            1. object是Promise对象则直接返回Promise对象  
            2. obect是具有then方法的对象(thenable对象)，会将该对象转为Promise对象，然后就立即执行thenable对象中的then方法 
            3.  参数不是有then的对象或者说不是对象，则直接生成Promise对象，并执行resolve()，将参数返回
            4. 不带有任何参数，。直接返回一个resolved状态得Promise对象  
            **立即resolve()的Promise，在本轮事件循环结束时执行，不是下一轮**  
        - Promise.reject(reason)  
            - 含义： 返回一个Promise实例，状态为rejected， 与Promise.resolve() 不同，reject会将参数原封不动作为reject的理由，变成后续方法的参数  
        - Promise.try()  不想区分同步还是异步，都用then方法指定下一步流程，用catch处理抛出的错误  
            - (async () => f())().then(...).catch(...)  
            - new Promise() 立即执行函数  
            **重点：Promise的异常捕获，不论同步异步都可以捕获**  
            `Promise.try(some-operation).then(...).catch(...)`  
        - Promise.prototype.then()  
           1. Promise.prototype.then(resolve, reject => {})  但推荐写法 Promise.then(resolve=> {}).catch()  
           2. then方法返回的是一个新的Promise实例，所以可以采用链式写法  
        - Promise.prototype.finaly()的执行，与Promise最后的状态无关，最后都会执行，且不接受任何参数  
        - Promise.all()
            - cosnt p = Promise.all([p1, p2, p3]) 将多个Promise实例包装成一个新的Promise实例  
            -  all()接受一个数组作为参数，或者是有Iterator接口的数据，如果参数成员不是Promise接口，会被Promios.resove()方法转化为Promise对象  
            - 所有成员的状态都变为fullilde， p的状态才会变成fulfild, 成员的返回值组成一个数组，返回给p的回调函数  
            - 只要有一个状态时rejected， p的状态就会变成rejected,第一个被rejected的实例的返回值会传递给p的回调函数  
        - Promise.race()  
            - 只要有一个成员状态率先改变了，race的结果就会获取到，该成员返回的值 场景： 读取文件失败后，做出响应  （超时响应）
        `Promise.all([fetch('/resource/a.js'), new Promise((resolve, reject) => { setTimeout(()=>{reject(new Error('request timeout'))} )})])`  
        - Promise.allSettled([p1, p2, p3]) 等到所有成员都返回状态结果（无论成功还是失败），包装实例才会结束  : 可以过滤出成功的结果 和失败的结果
        - Promise.any([p1, p2, p3]) 只要有一个成员变成 fulfilled状态，包装实例就会变成fulfilled状态，如果成员都变成rejected状态，包装实例就会变成rejected状态  
    - Iterator 和 for  of  
        - Iterator接口数据（原理时指针），Iteraotr.next() 返回值和是否遍历完成的一个布尔值的对象集合； **for...of专为迭代接口数据服务**
        - Iterator接口部署在数据结构的Symbol.iterator属性上，Iterator接口方法可以被改写  
        - return(), throw()   自己写遍历器对象生成函数，则return方法和throw都是可选的， return方法必须返回一个对象
    - Generator函数  
        - 含义：生成器函数，ES6用来解决异步编程的方案。Generator函数是个状态机，内部封装了多个状态。 执行Generator函数会返回一个遍历器对象， 可以遍历依次获取内部的状态  
        - 也是个普通函数，有两个特征： 1. function关键字和函数名之间有个星号 *  2. 函数内部使用yield表达式，定义了不同的状态 （yield 产出，生产）  
        - 返回一个遍历器对象，则用next()方法执行即可获取其内部状态  | 可以用for...of遍历Generator函数反回的遍历器对象
        - 不使用yield表达式，generator函数就成了一个单纯的暂缓执行函数  
        - yield只能在Generator函数里  
        - 任意一个对象的Symbol.Iterator方法，等于该对象的遍历器生成函数  ； Generator函数就是遍历器生成函数,可以把一个Generator函数赋值给对象的Symbol.Iterator 属性，从而使得该对象具有Iterator接口  
        - 调用next方法，必须将Gerator函数返回的生成器，赋值到变量上，在变量上操作  
        - next(arg)  yield表达式本身没有返回值，或者说总是返回undefined.  next方法可以带一个参数，该参数会被当作上一个yield表达式得返回值！  第一次执行next方法时加参数时无效的。
        - Generator方法返回的时遍历器接口，扩展运算符、解构赋值、Array.form方法内部  调用得都是遍历器接口，他们都可以将Generator函数返回的Iterator对象作为参数  
        - Generator.prototype.throw方法，可以在函数体外抛出，在Generator函数体内catch捕获  区分throw命令  
        - Thunck函数， 传名调用  JavaScript是传值调用得  
            - 只要参数有回调函数，就能写成Thunk函数形式 ，场景： 用于控制Generator函数自执行； Promise也能实现，then链式调用  
            - co模块， let co = require('co'); co(fn);    fn传入co()就能自动执行； co函数返回一个Promise对象
    - async 函数  
        - 含义： 是Generator函数的语法糖。async函数的改进相比Generator函数（内置执行器，与普通函数一样执行 | 更好的语义 | 适用性更广，await可以是Promise对象也可以是原始类型值会被转成Promise对象 | 返回值是Promise）  
        - await 命令后面的Promise对象如果变为reject状态，则reject的参数会被catch接收到  
        - 任何一个await语句后面的Promise对象变为reject状态，则整个async函数都会中断执行  
        - `async function f() {  
            await Promise.reject('出错).catch(e => console.log(e))  
            return await Promise.resolve('hello world)
        }`前一个Promise出错了，但错误被catch捕获了，依旧不影响后一个Promise执行  
        - 防止出错将await语句放入try...catch代码块中【或者在Promise后面加catch方法】， 多个await则可以都放入try...catch中  
        - try...catch 实现多次重复尝试 配合 await  
        - 多个await 命令等待异步操作，如果不存在继发关系，最好同步触发，提高执行效率  
            1. let [foo, bar] = await Promise.all([getFoo()，getBar()])
        - 顶层await  
            - 实现：返回async + 模块化 + then即可解决， 可以在模块输出中，默认输出Promise对象（async函数返回的就是一个Promise对象），在promise.then中去读取，能保证异步操作完成后去读取输出
            - 顶层await只是个提议，是对ES新标准的提议，能够不用在async函数内使用  
    - Class  
        1. 基本语法
            - 写法更像面向对象而已，实际上还是ES5的构造函数， class Person{}; typeof Person === 'function'  
            - `class Person() {
                constructor(name, age) {
                    this.name = name;
                    this.age = aage;
                }
                
                // 还能添加其他方法
                getFamily() {

                }
            }`  
            - 等同于向Person.prototype上添加方法，因此可以用assing方法，向类的prototype上添加方法
            - `Object.assign(Person.prototype, {
                getFamily() {},
                toValue() {}
            })`  
            - ES6类上定义的方法都是不可枚举的，ES5构造函数上的方法是可枚举的； 类必须使用new调用，否则报错，构造函数则不然；  
            - 类中也可以用get和set关键字，对取值和存值做拦截  
            - 可以采用 属性表达式 let say = 'greet'; class Hbs { constructor() {}, [greet]() { }};  
            - Class表达式  const MyHbs = class Hbs { };  // Hbs只能在类里面使用，外面要用Myhbs  
            - Class定义的类不存在变量提升，不同于ES5的构造函数；是为了继承 Extend设计，保证子类在父类之后定义  
            - 在类中用Static定义的方法，无法被实例继承，但可以被子类继承！  
            - super关键字用于  访问对象字面量 或 类的原型上的属性， 或 调用父类的构造函数  
            - 在Class类中使用super  1. 避免子类构造函数constructor重复复 2. 调用父类上的静态方法 3. 访问父类上的静态属性  
            - 私有方法和属性，提案 # 
        2. 继承  
            - extends继承要配合super使用。 ！！子类如果不在constructor方法中调用super方法，new实例的时候会报错！！
            - super作为构造函数时，只能用在子类的构造函数中，用在其他地方会报错  
            - super作为对象时，在普通方法中，指向父类的原型对象，在静态方法中指向父类 【super无法访问到定义再父类实例上的方法或属性】  
            - ES6里，允许继承原声构造函数，然后自定义子类功能
    - Module语法  
        1. 含义： CommonJS 运行时加载，效率低，加载整个模块; ES6模块编译时加载，只加载export输出的指定内容；  
        2. impor和export命令只能在模块顶层，不能在代码块中;   Nodejs有自己对CommonJS的加载方法， import()方法支持动态加载模块，返回一个Promise对象  
        3. import()函数加载适合场合
            - 按需加载  比如点击事件出发后加载
            - 条件加载  放if代码块中
            - 动态的模块路径 import(getFilePath()).then()  
    - 模块加载  
        1. 浏览器加载脚本， 异步脚本带有 defer 和 async, 会直接开始下载异步脚本，不会等待他的下载和执行；区别：
        （1） defer是延迟到整个页面渲染完成后再执行，async是等到下载完成后执行  （2）多个defer脚本，会按照他们
        在页面出现的顺序加载，而多个async脚本不能保证顺序
        2. 浏览器加载ES6模块，`<script type="module" src="./foo.js"></script>`  等同于defer脚本，也可以指明为async属性 
        3. ES6模块与CommanJS模块差异：  
            - CommanJS模块输出的是一个值的拷贝，ES6模块输出的是值的引用
            - CommanJS模块是运行时加载，ES6模块是编译时输出接口
        4. node.js加载 ，默认是用CommanJS处理的，v13.2 开始支持ES6模块
            - es6模块 .mjs 【如果不想写这个尾缀，则需要在package.json中设置type为module, .js才会被解释为ES6模块】, commonjs模块 .cjs 
            - main字段， package.json文件有两个字段 main 和 exports 都可以指定模块的入口文件  
            - exports字段优先级 高于 main字段
                1. 指定脚本或子目录的别名
                2. . 代表 main
                3. 一个模块同时支持ES6和CommanJS两种格式方法： main 字段指定commanjs入口，给Node.js使用， type: 'module'指定ES6模块入口，给打包工具使用
                4. es6模块的加载路径必须给出完成路径，且 不能省略脚本后缀名  
    - ES6下的编程风格（阮一峰建议）
        1. let 替代 var, 且不再使用var
        2. let 和 const 应该优先使用 const ;   `const [a, b, c] = [1,2,3]`  
        3. ESlint  
        4. 字符串一律使用单引号或者 反引号来设置动态字符串， 不使用双引号（多按下shift）
        5. 解构赋值、函数、函数参数、立即执行函数、数组、对象、继承、模块
            - 使用数组成员对变量赋值时，优先使用解构赋值  `const [firsr, second] = arr`
            - 函数的参数是对象成员，优先使用解构赋值 `function getFullName({firstName, lastName}){}`  
            - 函数返回多个返回值，优先使用对象的解构赋值，便于以后添加返回值
            - 对象静态化，尽量不随意添加新的属性，如要添加使用Object.assign(target, { clothes: []})  
            - 对象属性名是动态的，使用属性表达式 [getKey('canAble')]
            - 数组使用扩展运算符...拷贝数组 const arrCopy = [...arr]
            - 使用Array.from（）将类数组转化为数组
            - 立即执行函数可以写成箭头函数形式   `(() => { console.log('立即执行函数')})()`
            - 使用匿名函数当作参数的场合，尽量使用箭头函数，更简洁，且绑定了this
            - 函数的配置项参数，放在一个对象中，放在最后一个参数
            - 函数体内尽量不要用arguments变量，是类数组，可以多使用rest运算符 (...)
            - 使用默认值语法设置函数参数的默认值  function handleFlow(opts = {}) {}
            - 总是使用Class,取代需要prototype的操作，写法更简洁，直接在Class类中写方法就是定义在protoype中
            - 使用extends实现继承
            - Module语法时JavaScript模块标准写法，坚持使用 import 取代  require ,  使用  export 取代  module.exports  
    - 最新
        1. do表达式 ，do {} 且有返回值
        2. 函数的部分执行   多参数函数有时候需要绑定其中一个或多个参数，然后返回一个新的函数 **函数的部分执行时基于原函数的，原函数改变，部分执行生成的新函数也会改变**
        f(x, ?)       f(x, ...)   '?' 是单个参数占位符， '...' 是多个参数占位符
        3. 管道运算:  `表达式 |> 函数`  应用场景：把嵌套函数写成从做到右的链式表达式
        `'hello' |> doubleSay |> capitalize |> exclaim`
        必须是单参数，如果是多参数需要函数柯里化改成单参数版本
        4. 双冒号运算符取代this绑定写法(call,apply,bind)   foo::fn   ===>  fn.bind(foo);    foo::fn(...arguments) ===> fn.bind(foo, arguments)
        5. SIMD 单指令，多数据
    - 函数式编程
        1. 函数柯里化  将一个多参数的函数拆分成一系列函数，每个拆分后的函数都只接受一个参数
        `function add(x,y) { return x + y}`  改写成 `function add(x) { return function(y) { return x + y }}`
        或者时箭头函数写法  `const add = x => y => x + y`     调用：`add(1)(3)`  结果4  好处:参数链式传递
### 赋值、浅 拷贝、深拷贝
前言  
- 基本数据类型：Number String Boolean Null
 Undefined Symbol  引用数据类型
- 基本数据类型特点：直接存储在栈中
- 引用数据类型特点：存储的是该对象在栈中的引用（指针），真实的数据存放在堆内存中
1. 引用类型数据的赋值  
> 副本改变其中任何数据，源对象的数据都会改变，无论第一层是基本数据类型还是元数据中包含子对象  
副本和源对象都是指向的同一个引用
2. 浅拷贝对象
- 按位拷贝对象，创建一个新的对象，该对象有源对象属性值的一份精确拷贝，属性是基本数据类型，拷贝的就是基本数据类型的值，属性是引用类型，则拷贝的是内存地址
- 浅拷贝的方法：  (除了strignify其他几个方法都是不需要参数)
    - Array.prototype.concat()
    - Array.prototype.slice(start, end) 提取（截取）起始索引处(包含)到结尾（不包含）返回新数组的浅拷贝
3. 深拷贝
    - 拷贝一个一摸一样的副本，副本对象和源对象不共享内存
    - 实现：  
    1. 递归 
    2. loadash.cloneDeep
    3. - Object.parse(JSON.strignify(source)) 无法转化function和undefined

### 数据结构
1. 数组  
   定义：相同类型的变量有序的集合，最基本的数据结构  
   优点：按照索引**查询**和**遍历**元素速度很快  
   缺点：  
   - 创建后大小固定，无法扩容  
   - 只能存储一种数据类型
   - 添加、删除元素的操作很费时，要移动其他元素
2. 栈  
    定义：特殊的线性表，只能在表的固定一端进行添加和删除操作，该端称为栈顶，另一端称为栈底；
    - 操作规则：后进先出；
    - 读取数据从栈顶开始逐个读出
3. 队列  
    定义：和栈类似，也是特殊线性表，只能在表的一端进行插入操作，另一端进行删""除操作，一般来说，插入的一端  
    是队尾，删除的一端是队头。  
    - 操作规则：先进先出
4. 链表  
    定义：数据元素按照链式存储的数据结构，每个数据结点包括 数据域和指针域，指针域指下一元素存放的地址  
    类型：单向链表，双向链表，单向循环链表
5. 树  
    定义：典型非线性结构，由n个有限节点组成一个具有层次关系的集合，在树结构中仅有一个根结点，除了根结点其他结点都  
    有且仅有一个前驱结点，且可以有两个后继结点  
    二叉树：  
    - 二叉树第i（i>=1）层上的节点最多为2^(i-1)个
    - 深度为k （k>=1）的二叉树的最多有2^k-1个节点  
    - 先序遍历（根左右），中序遍历 （左根右），后序遍历 （左右根）**先中后是指根的顺序**
    - 满二叉树节点数目：2^k-1
    - 完全二叉树：最后一层不满，但从左到右是连续有的
6. 堆
7. 图  
    有向图，无向图
8. 哈希表（散列表）

### 首页白屏优化
>页面加载顺序问题，正常情况下，页面是先解析dom遇到资源先加载，加载完后立即执行完成后再继续解析dom,js脚本加载是同步阻塞的，会阻塞dom解析，当外部脚本文件过大，加载过程会导致用户看到页面一片空白，
- script标签插入到body底部
- 思路：加载js这部分时间能和dom解析并行就能省下部分时间
- defer属性 ，加载js和解析dom并行， js会被延迟到整个页面被解析完毕后再执行
- async属性 ，效果与defer 类似
