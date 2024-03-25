/*
 * @Description: 阮一峰得ES6教程中proxy实现
 * @Version: 1.0
 * @Autor: huabingsen
 * @Date: 2024-03-23 10:47:44
 * @LastEditors: huabingsen
 * @LastEditTime: 2024-03-23 11:02:40
 */
const queueObservers = new Set()
const observe = fn => queueObservers.add(fn)
const observable = obj => new Proxy(obj, { set })
function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    queueObservers.forEach(observe => observe())
    return result
}

const person = observable({
    name: '李四',
    age: 28
})
function print() {
    console.log(`${person.name}, ${person.age}`)
}
observe(print)
person.name = '刘建宇'
person.age = 30