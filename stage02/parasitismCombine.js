// 寄生组合式继承
function inheritPrototype(subType, superType) {
    let prototype = Object.create(superType.prototype); // 以父类原型对象作为原型新建一个对象
    prototype.constructor = subType; // 弥补上面重写原型而失去默认的constructor属性
    subType.prototype = prototype; // 指定对象，将新创建的对象赋值给子类的原型
}

function SuperType(name) {
    this.name = name;
     this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function() {
    console.log(this.name)
}

function SubType(name, age) {
    SuperType.call(this, name)
    this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function() {
    console.log(this.age);
}

const subInstance1 = new SubType('cxk', 99)
const subInstance2 = new SubType('llw', 87)





