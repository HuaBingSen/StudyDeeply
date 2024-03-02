// 检测数据类型的功能函数
const checkedType = (target) => Object.prototype.toString.call(target).replace(/\[object (\w+)\]/, "$1").toLowerCase();
// 实现深拷贝（Object/Array）
const clone = (target, hash = new WeakMap) => {
    let result;
    let type = checkedType(target);
    if(type === 'object') result = {};
    else if(type === 'array') result = [];
    else  return target;
    if(hash.get(target))  return target;

    let copyObj = new target.constructor();
    hash.set(target, copyObj)
    for (let key in target) {
        if(checkedType(target[key]) === 'object' || checkedType(target[key]) === 'array') {
            result[key] = clone(target[key], hash);
        } else {
            result[key] = target[key];
        }
    }
    return result;
}
   
const obj = {
    name: 'Chen',
    detail: {
        age: '18',
        height: '180',
        bodyWeight: '68'
    },
    n: null,
    hobby: ['see a film',  'write the code',  'play basketball', 'tourism']
  }
  obj.tempObj = obj;
  const obj1 = clone(obj);
  console.log('obj1=====>', obj1 === obj);
  