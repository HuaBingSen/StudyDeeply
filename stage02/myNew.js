function Person(name, age) {
    this.name = name;
    this.age = age;
    this.say = function() {
        console.log(this.name + this.age)
    }
}

// const p1 = new Person('huabingsen', 20)
// console.log(`p1-{name:${p1.name},age:${p1.age}}`)
// p1.say();

function _new(constructor, ...rest) {
    // 将新对象的proto指向构造函数的prototype
    const newObj = Object.create(constructor.prototype)
    // 执行构造函数并将其this指向新对象，传入参数
    let result = constructor.apply(newObj, rest)
    // 如果构造函数返回了对象则将返回的对象return,否则return新建对象
    return typeof result === 'object' ? result : newObj
}

const p2 = _new(Person, 'jianglun', 18)
console.log(`p2-{name:${p2.name},age:${p2.age}}`)
// console.log(p2 instanceof Person)
// p2.say();