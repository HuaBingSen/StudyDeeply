- TypeScript静态类型的优点
    - 有利于静态代码分析， 不用运行在编写过程中会做静态分析语法等问题，可以及时发现错误
    - 有利于发现错误
    - 更好的IDE支持，做到语法提示和补全
    - 类型信息有助于开发者理解代码
    - 有助于重构代码
- 基本用法
    - 类型声明
        - 标识符后面，冒号 + 类型，函数参数和返回值也是如此；
        - 变量只有在赋值后，才能使用，否则TS中会报错
    - 类型推断 如果定义变量不加类型，TS会默认推断出变量的类型，函数返回值也能推断出类型
    - TypeScript Playground 在线编译TS文件
    - tsc编译器的常用命令
        - tsc -v 查看编译器版本
        - tsc file1.ts file2.ts --outFile app.js   将多个ts文件编译称一个js文件
        - tsc app.ts --outDir dist  将编译结果保存在指定目录
        - tsc --target es2015 app.ts 指定编译后得分JavaScript版本
    - tsconfig.json 免于写tsc的编译参数
    - 直接运行ts脚本
        - 全局安装 ts-node，使用
        - npx 调用ts-node
    - 数据类型
        - 五种原始类型： number string boolean symbol bigint   都有对应的包装类型； Symbol()和BigInt()无法作为构造函数使用，前三个可以
        - 两种  特殊数据类型，代表空的状态
        - 一种复杂类型 Object 包含了 对象，数组，函数
- any、unknown、never
    - any
        - 没有任何限制，该类型的变量可以赋予任意类型的值。实际上any类型下，是会关闭其类型检查。
        - any类型的变量，调用去方法或者获取其属性即使不存在也不报错
        - 尽量避免使用any,否则失去typescript的意义，以下两个场合适合any
            - 处于特殊原因，需要关闭某些变量的类型检查
            - 久远的JavaScript项目迁移到typescript时，可以为那些复杂变量设置为any，防止报错
        - 类型推断不出结果，则typescript认为是any类型。 --noImplicitAny 该选项能让推断出any类型报错
        - 污染问题： any类型的变量，可以赋值给任何其他类型的变量
    - unknown
        - any加强版，也能分配各种类型值，但式不允许unknown类型的变量赋值给其他类型的变量，防止污染问题（除了能赋值给any和unknown类型）
        - 不能调用unknow类型变量的方法和属性
        - 能使用的运算符有限，只能使用 比较运算符、取反、typeof、instanceof
        - 类型缩小后，才能使用unknow【通过typeof确定了其类型 】
        - 能使用any则优先考虑unknown
    - never
        - 空类型
        - 任何其他类型的变量都不能赋值给never类型的值，除了never本身
        - never类型的变量可以赋值给任意其他类型
    - tyscript有两个顶层类型： any unkown,一个底层类型 never
- 类型系统
    - 如果没有显示地设置为null和undefined类型，需要开启noImplicitAny和strictNullChecks，才不会被推断为nay
    - 值类型 let x:'hello';
    - 联合类型： let x:string|number;       let rainbowColor: '赤'|'橙'|'黄'|'绿'|'青'|'蓝'|'紫';       let name:string|null;
    - 交叉类型：通常用于给对象添加新属性
    - type 命令用来定义一个类型的别名， 作用域是块级作用域
    - 类型兼容 type T = number | string;
- 数组类型
    - TypeScript中，数组 分为 数组 和 元组（tuple） 两种类型
    - 数组
        - Ts中的数组，所有成员的类型必须相同；
            - let arr: number[] = [1,2,3];      let arr: (number|string)[] = [1, 'hello'];
            - let arr: Array<number> = [1,2,3];     let arr: Array<number|string> = [1, 'hello'];
        - 只读数组
            - const arr: readonly number[] = [1,2]
            - 只读数组 readonly number[] 是 number[]的 父类型，父类型的值不能赋值给 子类型（类型断言能解决这一问题）， 子类型的值可以赋值给父类型；
            - readonly 关键字不能与数组泛型一起使用 const arr: readonly Array<number> = [0,1] // 不行！！
            - const arr1: ReadonlyAarray<number> = [0,1]  可以
            - const arr2: Readonly<number[]> = [0,1]  可以
            - const arr3 = [1, 2] as const; // 可以  arr3是只读数组，不能对其成员进行改变
            - 多维数组： T[][] 形式， 表示二维数组， T是最底层数组成员的类型
    - 元组
        - const s:[string, string, boolean] = ['jack', 'jenny', false]; 元组表示指定 每个元素类型和数量的数组
        - 和数组的区分， 元组的 成员类型 写在 方括号 [] 里面
        - let a: [number, string?] = [1]；  ?表示该成员可选; 可选成员只能在数组的尾部，可以是1个或者2个...
        - 元组默认不能越界访问，使用扩展运算符 可以表示不限成员量的数组
            - type NamedNums = [ string, ...number[] ];     const a: NamedNums = ['A', 1, 2];   const B: NamedNums = ['B', 1, 2, 3]; 
            - 元组的成员都是数值索引， 可以通过 tuple[number] 获取索引类型， tuple表示元组的名称；
            - 只读元组
                - type t = readonly [number, number];
                - type t = Readonly<[number, string]>;
            - 元组的成员数量在TS中，是可以被TS自动推断出的； 使用了扩展符的元组，成员数量无法推断，ts内部将其当成数组处理；
            - 扩展运算符将数组转换成一个逗号分隔的序列，ts会认为该序列的成员数量是不确定的，如果传入函数作为参数，则会报错
                - 所以把成员数量不固定的数组携程数量确定的元组， const arr:[number, number] = [1,2];
                - 或者 使用类型断言     const arr = [1, 2] as const;
- symbol
    - const a: unique Symbol = Synbol();  // unique symbol是symbol类型的子类型
    - 不同的unique symbol的值，其类型也是不同的， unique symbol只能用cosnt定义
- 函数
    - 三种写法
        - function hello (txt:string): void {} // 函数的返回值类型可以不写，ts可以推断出来
        - const hello = function(txt:string) {} // 函数表达式第一种写法
        - const hello: (txt:string) => void = function(txt) {}
    - 一个变量，要套用另一个函数类型，可以使用typeof 运算符
        - funcion add(x: number) {return x};   const myAdd: typeof add = function(x) { return x}
    - 函数类型可以采用对象写法，适合函数本身存在的属性
    - 也可以使用interface来声明(对象声明的翻版写法)
    - Function类型， 不建议使用，等于对函数没有任何约束
    - 箭头函数
    - 可选参数 ?， 表示参数类型为 原始类型|undefined 只能在参数列表尾部，跟在必选参数后面； 可选参数在函数内用到时候，需要判断是否为undefined
    - 默认参数  默认参数是可选的，不传则代表等于默认值； 默认参数不是位于末尾，调用时不能省略，要触发默认值，则需要显示传入undefined
    - 参数结构 建议和类型别名（type命令）结合使用，看起来更简洁  type ABC = { a: number； b: number; c:number }  function sum({a, b, c}: ABC) { console.log( a + b + c ) }
    - rest参数
    - readonly 只读参数， 函数内部不能修改
    - void 类型，表示函数没有返回值， 允许返回undefined或者null; 打开了strictNullChecks编译选项，那么 void 类型只允许返回undefined
    - never类型标识肯定不会出现的值，用在函数的返回值，标识某个函数不会返回值，函数不会正常执行结束。
        - 抛出错误的函数 throw 而不是 return
        - 无限制执行的函数
    - 局部类型，函数内用命令来定义类型，作用域是函数内
    - 高阶函数--函数的返回值还是函数，则前者就是高阶函数； 同时形成了闭包；
    - 函数重载
        - 声明列举函数的各种情况，再声明函数本身（重载）
- 对象
    - const obj: { x: number, y: number; } = {x:1, y:1}; 也可写成type类型，  type myObj = { x: number; y: number; }; const obj1: Myobj = {x:1, y:1};  
    - 限制了对象内的属性名和属性个数，不能多也不能少，读取不存在的属性也会报错；不能删除对象的属性，因为对象的属性默认是静态的； 修改属性的值是允许的；
    - 对象的方法使用函数类型描述（也可以是箭头函数） const obj: { x: number; y: number; add: (x: number, y:number) => number } = { x: 1, y: 1,
            add(x, y) {
                    return x + y;
                }
            };
    - 也可以使用interface将对象提炼为一个接口
    - 可选属性 ? 可选属性等同于允许赋值undefined, 读取可选属性之前最好 对其检查值是否为undefined
    - 只读属性 readonly ，只能在初始化的时候赋值，此后不允许修改； readonly 修饰的属性的值 是对象， 则允许修改属性的内部属性，但不允许替换对象
    - 属性名的索引类型
        - type myObj =  { [prototype: string]: string };  const obj:myObj = { foo: 'a', bar: 'b' } 采用表达式的方式写属性名
        - 对象的属性有三种类型： string, number, symbol
    - 解构赋值
        - const {id, name}:{ id: string; name: string; price: number; } = product;
    - 结构类型原则
        - 对象B满足对象A的结构特征，B就兼容对象A的类型，能用A的地方就能用B
    - 字面量严格检查 左右一定要对等，前提是 左边是字面量结构类型，右边是字面量对象
    - 左边字面量结构 ，右边是变量，则严格字面量检查不会触发，而是根据结构类型原则不会报错
    - 确定字面量没有错误，可以使用  中间变量赋值 或者 类型断言 两种方式 规则 严格字面量检查
        - tsconfig.json中 可以 "suppressExcessPropertyErrors": true 关闭多余属性检查
    - 空对象不允许直接添加属性，如果需要则 1. 生成时一次性声明所有属性 2. 使用扩展运算符结构到空对象中，能完成分步声明
- interface
    - 是 对象 的模板， 类型约定
    - 表示对象的各种语法，成员有五种形式
        - 对象属性 
            - 以分号或者逗号隔开， 可选属性 ? 只读属性 readonly
        - 对象的属性索引
            - interface A { [prop: string]: number; } 属性表达式就是字符串索引， 表示属性只要是字符串就符合
            - 属性索引有三种类型 string number symbol; 数值索引服从字符串索引
        - 对象方法
            - 三种写法
                - interface A { f(x: boolean): string;  }  函数声明
                - inferface B { f: (x: boolean) => string; }  箭头函数
                - inferface C { f: { (x: boolean): string }; }
            - 接口内定义函数重载无需在内部给出实现，但使用时须在外部给出实现
        - 函数
            inferface 用来声明独立的函数 interface add { (x: number, y: number): number; }
        - 构造函数
            interface ErrorCOnstructor { new (message?: string): Error; } 内部有new表明接口是构造函数
    - interface继承
        - 继承 interface, 使用 extends继承，允许多继承
        - 继承 tyoe, 必须是 type命令的对象才能继承
        - 继承 class
    - 接口合并
    - interface type 异同
        - type interface class都能表示一个类型同时定义一个对象，单纯想要一个类型，使用 type 或者 interface, class会创造一个值，编译后还存在
        - 异：
            - type能表示非对象类型，interface只能表示对象类型（数组函数等）
            - interface可以继承其他类型， type不支持继承， type要添加属性，只能使用 & 运算符 type Bear = Animal & { honey: boolean}
            - 同名interface会自动合并，type同名会报错
            - interface不能包含属性映射，type可以 
            - this关键字只能用于 interface
            - type可以扩展原始数据类型
            - type可以表达某些复杂类型， interface不行
            - 有负责类型运算，没其选择使用type； interface方便合并，相对更灵活
        - 同 都可以用来定义一个类型和对象
- class
    - 简介
        - 属性类型
            - 类的属性ts中会做是否设置初始值检测 strictPropertyInitialization，默认是打开的，没有初始值就报错；
            - class Point { x!: number; } 非空断言，则不会报错
        - readonly修饰符
            - 构造函数内，可以指定readonly修饰的属性
        - 类的方法，直接写在类中，跟普通函数一样写
        - 存取器方法
            - 某个属性只有set方法，没有get方法，则该属性自动成为只读属性
            - 5.1之后，get和set的参数类型可以不兼容
            - get方法与set方法的可访问性必须一致，公开方法或者私有方法
        - 属性索引
            - 属性索引定义涵盖了方法
    - 类的interface接口
        - implements关键字
            - interface或者type定义一组对象形式，为class指定检查条件，class可以implements实现
            - clss A mplements实现了某个类，但 被实现类的类型声明不能被实现，实现类需要自己定义类型
            - 允许子类 添加额外属性和方法，子类除了能实现 接口和类型， 还能实现 类
            - 注意：interface描述的是对外接口，都是公开属性和方法，不允许定义私有属性和方法，只有类才可以
        - 实现多个接口
            - 接口继承， C要实现A和B, 只需要 B继承A, C实现B就相当于 实现了 A和B
        - 类与接口的合并
            - 接口会被合并进同名类里面
        - Class类型
            - 实例类型
                - 类代表的是一种类型，类名就代表一种类型， 可以声明类型为Interface或者Class
                - typeof获取类的自身类型
                - 结构类型原则
            - 类的继承
                - 子类可以覆盖基类的同名方法
                - 子类的同名方法不能与基类的类型定义冲突
        - 可访问性修饰符
            - public 公开成员，外部可以自由访问，默认不加，除非醒目加
            - private   私有成员，只能在类内部使用，类的实例和子类都不能使用； 子类不能定义父类私有成员的同名成员； ts转js，private被剥离，建议使用#描述私有成员， class A { #x = 1;}
            - protected 成员是保护成员，只能在类的内部使用该成员，实例无法使用，但子类内部可以
        - 实例简写属性， class Pont { constructor(public x: number, public y: number){} } public显示声明不能省略在此处构造函数中
        - 静态成员 只能类本身使用，不能通过实例对象使用
        - 抽象类 abstract 类不能被实例化，只能当成其他类的模板，只能当成基类使用，
            - 抽象类内部可以有实现好的属性和方法， 没实现好的属性和方法叫 抽象成员
-  泛型
    - 含义： 解决参数和返回值之间的类型关系。 特点： 带有类型参数；
        - function geteFirst<T>(arr: T[]): T { return arr[0]}, 复杂场景需要写参数类型，ts可能推断不出参数类型
        - 参数类型可以是联合类型，该情况下 类型参数不能省略
        - 泛型是一段类型逻辑，需要类型参数来表达，有了类型参数后，可以在输入类型与输出类型之间，建议一 一对应关系
    - 写法
        - 场合： 函数、接口、类、别名
        - 函数的泛型写法
            - 函数声明式，类型参数可以省略  function getID<T>(arg: T): T {}
            - 函数表达式    let mygetID: <T>(arg: T) => T = id
            - 函数表达式    let mygetID: { <T>(arg:T): T } = id
        - 接口的泛型写法
            - interface Box<Type> { contents: Type }; let box:Box<string>;
        - 类的泛型写法
            - class Pair<K, V> { key: K; value: V; }
            - class A<T> { value: T; }  class B extends A<any> { }
            - 泛型类描述的是 类的实例， 不包括静态属性和静态方法，
        - 类型别名的泛型写法
            - type Nullable<T> = T | undefined | null;
    - 类型参数的默认值
        - function getFirst<T = string>( arr: T[] ): T { return arr[0] }  如果没传类型参数的值，就会使用默认值； 传入的参数不带 类型参数 也不会报错，因为会推断出类型覆盖掉默认值
        - 类型参数的默认值，多用于类中
    - 数组的泛型表示
        - interface Array<Type> { length: number; pop(): Type | undefined; push(...items: Type[]): number; }
    - 类型参数的约束条件
        - function comp<T extends { length: number }>( a: T, B: t) { if ( a.length >= b.length ) { return a; } return b; }
        - 写法 <TypeParameter extends ConstrainType>
    - 注意点
        - 尽量少用泛型，会加大代码复杂性，但看情况需要
        - 类型参数越少越好
- enum类型（可枚举）
    - 简介：开发中经常需要定义一组相关常量，只需要用到其变量名，而不关心其值，枚举类型就很方便
        - 枚举类型经过ts编译器编译后是一个对象结构，key是枚举的成员，值默认是0开始；
        - 试用场景：成员值不重要，名字更重要，从而增强代码的可读性和可维护性。
        - object as const 能替代 enum结构（对象的类型断言）
    - 成员值
        - 默认从0开始递增，也可以显示赋值，可以是任意数值，但不能是bigInt，成员值也可以相同， 只设定第一个成员的值，后续成员值会递增
        - 成员值都是只读的，不能重新赋值
        - 通常会在enum前面加上 const    `const enum Color { Red, Green, Blue }` 加上const后，编译成js就没有对象产物了
    - 合并enum
        - 只允许其中一个enum结构的首成员省略初始值，否则会报错
        - 不能有同名成员
        - 必须都是const 枚举或者 非 const枚举
    - 字符串enum
        - enum的成员还能设置为字符串（enum的成员只允许为数值和字符串）enum userType { admin = 'admin', manager ='manager' }
        - 字符串enum可以使用联合类型 ， typeof enumData 可以取出enum数据的成员名作为联合类型
    - 数值enum存在反映射，能通过成员值获取成员名 （字符串enum不存在反映射）、
- 类型断言
    - as关键字，告诉编译器 将该值 按照 什么类型去处理
    - 写法
        - value as Type
        - <Type>value
        - 注意： 类型断言能让错误代码通过编译，不应滥用
    - 类型断言的条件
        - expr as T  expr实际值，T是类型断言， expr是T的子类型，或者 T是expr的子类型
    - as const断言
        - let声明的变量，没有声明类型，则被推断为string类型； const则被推断为值类型； const有 类型缩小的作用
        - value as const  告诉编译器，推断类型时，该值为常量； as const只能用于字面量，不能用于变量 ，也不能用于 表达式
        - array1 as const 能将 array1变成只读数组，也是元组，可以用扩展运算符作用于函数参数 add(...array1)
    - 非空断言 ！
    - 断言函数  
        `function isString(value:unknown):asserts value is string {  
            if (typeof value !== 'string')  
                throw new Error('Not a string');  
        }`
- 模块
    - TypeScipt的模块支持所有ES6的模块语法，特别之处在于允许输出和输入类型  export type Bool = trur | false;
    - import type语句， 区分输入的类 和正常接口
        - import { type A, a } from 
        - import type { A } from 只用来输入类型
    - import fs = require('fs') 输入commonjs模块
    - export = obj    等同于 commonjs的   module,exports
    - 模块定位
    - 路径映射 baseUrl字段，指定脚本模块基准目录
        - paths字段， 非相对路径的模块和实际脚本的映射
- namespace
    - 命名空间，是ES模块诞生之前，作为TypeScript自己的模块格式而发明的，目前版本是不推荐使用的
    - 基本用法
        - 建立容器，内部所有变量和函数都必须在 容器内使用 ，或者将容器内的成员通过export命令输出
        - `namespace Utils { function isString(value: any) { return typeof value ===  'string' } }`
        - namespace的本质是 javascript的自执行函数内部成员都添加到了外部对象上，
    - export namespace 输出
- 装饰器（旧）
    - 2014年开始支持的装饰器，但还有很多版本在使用，后续会逐步淘汰使用新版本
    - 要使用修饰器的旧语法，需要打开编译选项，可以通过命令行打开 或者 tsconfig中配置 `"experimentalDecorators": true, "emitDecoratorMetadata": true`
    - 装饰器的种类
        - 类装饰器
        - 属性装饰器
        - 方法装饰器
        - 存取器装饰器
        - 参数装饰器
    - 构造方法没有装饰器，只有参数装饰器，类装饰器就是在装饰构造方法； 装饰器只能用于类， 要么用于类的整体，要么用于类的内部成员，不能用于普通独立函数
    - 装饰器会在编译阶段执行一次，且只会执行一次
    - 类装饰器
        - 定义： type ClassDecorator = <TFunction extends Function> (target: TFunction) => TFunction | void;  类型参数是构造方法，返回值 是 处理好的构造方法 或者 新的构造方法。
        - 作用： 在装饰器内部，对构造方法进行改造，有返回值，则替换掉原来的构造方法
        - 可以利用装饰器，编写工厂函数（工厂模式，生成实例）
    - 方法装饰器
        - type MethodDecrorator = <T>( target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
        - 方法装饰器参数： target: 类的构造函数，或者 类的原型， propertyKey: 所装饰方法的方法名，类型为 string | symbol,  descriptor: 所装饰方法的描述对象（对象的描述符：数据描述和访问描述之类）
    - 属性装饰器
        - 写法：type PropertyDectorator = ( target: Object, propertyKey: string | symbol ) => void 不需要返回值
        - 通常用于校验检查属性范围
    - 存取器装饰器
        - 与方法修饰器定义一样
    - 参数装饰器
        - 主要用于输出信息
- 装饰器（新） 【后续再补上】
    - 装饰器，定义时修改类的行为
    - 语法特征
        - @表达式
        - 表达式必须是函数或者执行后得到一个函数
        - 函数接受所修饰对象的一些相关值作为参数
        - 函数要么不返回值，要么返回一个新对象取代所修饰的目标对象
    - 装饰器的结构
        ``` 
        type Decorator = ( 
            value: DecoratedValue,  // 所装饰对象
            context: { 
                kind: string; // 装饰器对象类型 可能是 'class' 'method' 'getter' 'setter' 'field' 'accessor'
                name: string | symbol; // 装饰器对象名字
                addInitializer? ( initalizer: () => void ): void; // 添加类的初始化逻辑
                static?: boolean; // 装饰对象是否为类的静态成员
                private?: boolean; // 装饰的对象是否为类的私有成员
                access: {
                    get?() : unknown;
                    set?(value: unkown): void;
                }
            }
        ) => void | ReplacementValue
        ```
        - 一般用来对类进行操作，可以不返回任何值
    - 方法装饰器
        ```
        type ClassMethodDecorator = (
            value: Function,
            context: {
                kind: 'method';
                name: string | symbol;
                static: boolean;
                private: boolean;
                access: { get: () => unknown };
                addInitializer(initializer: () => void): void;
            }
        ) => Function | void;
        ```
    




 






