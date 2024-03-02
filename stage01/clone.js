const checkType = (target) => Object.prototype.toString.call(target).slice(8,-1)

function deepClone(target) {
    let result, targetType = checkType(target)
    if (targetType === 'Object') {
        result = {}
    } else if (targetType === 'Array') {
        result = []
    } else {
        return target
    }

    for(let i in target) {
        let value = target[i]
        if ( checkType(value) === 'Object' || checkType(value) === 'Array' ) {
            result[i] = deepClone(value)
        } else {
            result[i] = value
        }
    }

    return result
}