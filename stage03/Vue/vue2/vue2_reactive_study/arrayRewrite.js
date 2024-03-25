/*
 * @Description: 重写数组方法，以实现对数组的响应式监听
 * @Version: 1.0
 * @Autor: huabingsen
 * @Date: 2024-03-22 23:57:32
 * @LastEditors: huabingsen
 * @LastEditTime: 2024-03-23 10:11:31
 */

function render() {
    console.log('视图渲染')
}
let obj = [1,2,3]
const methods = ['pop', 'shift', 'unshift', 'sort', 'reverse', 'splice', 'push']

const arrayProto = Array.prototype
let rewritedProto = Object.create(arrayProto)
methods.map( method => {
    rewritedProto[method] = function() {
        arrayProto[method].call(this, ...arguments)
        render()
    }
})
function observer(obj) {
    if ( Array.isArray(obj) ) {
        obj.__proto__ = rewritedProto
        return
    }

    if ( typeof obj == 'obj' ) {
        for ( let key in obj ) {
            defineReactive(obj, key, obj[key])
        }
    }
    return;
    function defineReactive(obj, key, value) {
        observer(value)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            set: ()=> {
                console.log('get', value)
                return value
            },
            set: newVal => {
                observer(newVal)
                if ( newVal !== value ) {
                    console.log('set', newVal)
                    render()
                    value = newVal
                }
            }
        })
    }
}

observer(obj)
obj.push(3,5)
console.log(obj)