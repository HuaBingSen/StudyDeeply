// 组合继承
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function() {
    console.log(this.name)
}

function SubType(name, age) {
    SuperType.call(this, name)
    this.age =age
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
    console.log(this.age)
}

const subInstance1 = new SubType('huabingsen', 28)
subInstance1.colors.push('black');
console.log(`subInstance1.colors==${subInstance1.colors}`)
subInstance1.sayName();
subInstance1.sayAge();

const subInstance2 = new SubType('liujenny', 27)
console.log(`subInstance2.colors==${subInstance2.colors}`);
subInstance2.sayName();
subInstance2.sayAge();

const supInstance1 = new SuperType('liuzhenfa')
console.log(`supInstance1.colors==${supInstance1.colors}`);
supInstance1.sayName();

