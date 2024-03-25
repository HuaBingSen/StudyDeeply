/*
 * @Description: 发布订阅模式模式----未实现版本！！！
 * @Version: 1.0
 * @Autor: huabingsen
 * @Date: 2024-03-25 12:38:05
 * @LastEditors: Huabingsen 2907919544@qq.com
 * @LastEditTime: 2024-03-25 13:59:15
 */

// 订阅者： 订阅者，存储依赖，收集依赖，删除依赖，向依赖发送消息
// 订阅者Dep类， 用于解耦 属性的依赖收集 和  派发更新操作. 存放 watcher观察者对象watch，watcher是中间介 角色， 数据发生变化时 通知watcher, 
// watcher 再通知其他地方

// 实现订阅者Dep
class Dep {
    constructor() {
        // 存放watcher对象的数组
        this.subs = []
    }
    // 在subs中添加一个watcher对象
    addSub(sub) {
        this.subs.push(sub)
    }
    // 通知所有watch对象更新视图
    notify() {
        for(const sub of this.subs) {
            sub.update()
        }
    }
}

// 实现Watcher
class Watcher {
    constructor(obj, key, cb) {
        // 给Dep添加target属性 然后 指向 自己的构造函数
        // 然后 触发属性的getter 添加监听
        // 将Dep中添加的target置空
        Dep.target = this
        this.cb = cb
        this.obj = obj
        this.key = key
        this.value = obj[key]
        Dep.target = null
    }
    update() {
        // 获取新值
        this.value = this.obj[this.key]
        // 定义一个render函数，该函数用来模拟视图更新
        this.cb(this.value)
    }
}

// 给Object.defineProperty添加 依赖收集和触发
function observe(obj) {
    if( !obj || typeof obj !== 'object') {
        return
    }
    Object.keys(obj).forEach( key => {
        defineReactive(obj, key, obj[key])
    })
    function defineReactive(obj, key, value) {
        observe(value)
        let dp = new Dep()
        Object.defineProperty(obj, key, {
            enumerable: true, // 属性描述符，是否可枚举（遍历），默认是false
            configurable: true, // 属性描述符，是否可配置（可写、删除等），默认false
            // 监听值的读取
            get: function reactiveGetter() {
                console.log('get', value)
                // 将watcher 添加到订阅
                if (Dep.target) {
                    dp.addSub(Dep.target)
                }
                return value
            },
            // 监听值的更改
            set: function reactiveSetter(newValue) {
                // 如果新赋的值是对象，则需要继续递归监测
                observe(newValue)
                // 只有赋的值是新值才重新渲染且通知
                if ( newValue !== value ) {
                    console.log('set', newValue)
                    render()
                    value = newValue
                    // 执行watcher的update方法
                    dp.notify()
                }
            }
        })
    }
}

class Vue {
    constructor(options) {
        this._data = options.data
        observe(this._data)
        new Watcher()
    }
}

let vue_instance = new Vue({ data: {name: 'jack', cars: [1,2]} })
vue_instance._data.name = 'jenny'
vue_instance._data.cars.push(3)
