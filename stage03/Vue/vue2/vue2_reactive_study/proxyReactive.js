/*
 * @Description: 掘金-珠峰架构课程的示例 proxy实现代理
 * @Version: 1.0
 * @Autor: huabingsen
 * @Date: 2024-03-23 11:03:01
 * @LastEditors: huabingsen
 * @LastEditTime: 2024-03-23 11:33:30
 */

function render(type) {
    console.log('模拟视图更新:'+ type);
}
let obj = {
    name: '蓝康',
    info: { age: 28, isMarried: true },
    workPlaces: [0, 1, 2]
}

const handler = {
    get(target, key) {
        render('get')
        if ( typeof target[key] === 'object' && !target[key]) {
            return new Proxy(target[key], handler)
        }
        return Reflect.get(target, key)
    },
    set(target, key, value) {
        render('set')
        return Reflect.set(target, key, value)
    }
}

let proxy = new Proxy(obj, handler)
// proxy.info.car = '大众'
console.log(proxy.info)
// proxy.groups = ['dad', 'mom', 'wife']
// console.log(proxy.info.car)
// proxy.workPlaces[0] = '4'
// console.log(proxy.workPlaces)
proxy.workPlaces.length = 10;
