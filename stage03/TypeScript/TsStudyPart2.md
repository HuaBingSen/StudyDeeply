### declare
- 含义：declare关键字用来告诉编译器，某个类型是存在的，可以在当前文件使用。且做一些描述说明
- 可以描述类型：
    ```
    - type或者interface命令声明的类型
    - class
    - enum
    - 函数
    - 模块 （module）
    - 命名空间 (namespace)
    ```
- declare vairable
    - declare let x: number  x是其他脚本定义，但在当前脚本使用
    - declare function sayHello(name:string):void 给出外部函数的类型描述
### d.ts 类型声明文件
- 单独使用的模块，一般会同时提供一个单独的类型声明文件，把本模块的外部接口的所有类型都卸载这个文件李，便于使用这了解。 类型声明文件中只有类型代码，没有具体实现代码，文件名 为 [模块名].d.ts形式   d是declaration的简称
- 类型声明文件来源
    - typescript编译器自动生成   tsconfig.json 的 declaration选项打开
    - typescript内置类型文件
    - 外部模块的类型声明文件，需要自己安装
### 类型运算符
- keyof 运算符
    - 单目运算符，接受一个对象类型作为参数，返回该对象的所有键名组成的联合类型
    ```
    type Obj = {
        foo: number,
        bar: string,
    }
    type Keys = keyof Obj  // 返回 'foo' | 'bar'
    ```
    - 用处： 取出对象的某个指定属性的值，
- in 便利联合类型的每个成员类型、
- [] 方括号运算符 取出对象的键值类型，如果方括号内的参数是联合类型，则返回的也是联合类型
- extends...?: 条件运算符   根据当前类型是否符合某种条件，返回不同类型
- infer 用来定义泛型里面推断出来的参数类型，不是外部出入的参数类型
- is运算符 描述返回值是true还是false
- 模板字符串 内部可以引用其他类型， 共可以引用7种类型  string number bigint boolean null undefined enum,引用这7种类型之外的会报错
- satisfies运算符 检验某个值是否符合指定类型
### 类型映射
- 定义：将一种类型按照映射规则，转换成另一种类型，通常用于对象类型
### 注释指令
- //@ts-nocheck 不对当前脚本进行类型检查
- //@ts-check 对脚本进行检查
- //@ts-ignore 不对下一行代码进行类型检查
- //@ts-expected-error 
### tsconfig.json

