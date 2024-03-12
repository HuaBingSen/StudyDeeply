function MyClass() {
    SuperClass.call(this);
    OtherSuperClass.call(this);
}

MyClass.prototype = Object.create(SuperClass)

Object.assign(MyClass.prototype, OtherSuperClass.prototype)

MyClass.prototype.constructor = MyClass;