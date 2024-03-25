/*
 * @Description: vue2的响应式原理探究-Object.property
 * @Version: 1.0
 * @Autor: huabingsen
 * @Date: 2024-03-22 20:34:38
 * @LastEditors: huabingsen
 * @LastEditTime: 2024-03-22 23:56:02
 */

// 模拟视图渲染
function render() {
    console.log('模拟试图渲染')
}
// 定义要跟踪的对象数据
let userData = {
    name: '华炳森',
    location: { city: '深圳', group: '宝安'}
}
// 跟踪对象
observer(userData)
// 定义并实现监听对象的方法
function observer(obj) {
    // 监听的不是对象则不处理
    if (!obj || typeof obj !== 'object') {
        return
    }
    // 遍历对象获取其key、value，然后监听对象上的各个属性以get/set方式来监听（defineReactive处理）
    Object.entries(obj).map( ([key, value]) => defineReactive( obj, key, value) )

    function defineReactive(obj, key, value) {
        // 如果子属性是对象还需要继续递归监测
        observer(value)
        // Object方法的defineProperty方法监听对象上的属性的get/set
        Object.defineProperty(obj, key, {
            enumerable: true, // 属性描述符，是否可枚举（遍历），默认是false
            configurable: true, // 属性描述符，是否可配置（可写、删除等），默认false
            // 监听值的读取
            get: function reactiveGetter() {
                console.log('get', value)
                return value
            },
            // 监听值的更改
            set: function reactiveSetter(newValue) {
                // 如果新赋的值是对象，则需要继续递归监测
                observer(newValue)
                // 只有赋的值是新值才重新渲染且通知
                if ( newValue !== value ) {
                    console.log('set', newValue)
                    render()
                    value = newValue
                }
            }
        })
    }
}
userData.name
userData.location = {
    city: '广州', group: '天河'
}