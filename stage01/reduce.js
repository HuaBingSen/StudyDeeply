// 统计数组内元素出现的次数
function countsArray(targetArray) {
    if ( targetArray && Array.isArray(targetArray) ) {
       return  targetArray.reduce((accumulator, current) => {
        if ( current in accumulator ) {
            accumulator[current]++
        } else {
            accumulator[current] = 1
        }
        return accumulator
       }, {})
    } else {
        console.log('参数不是数组！')
    }
}


function removeRepeatInArray(targetArray) {
    if ( targetArray && Array.isArray(targetArray) ) {
        return  targetArray.reduce((accumulator, current) => {
         if ( !accumulator.includes(current) ) {
            return accumulator.concat(current)
         } else {
            return accumulator
         }
        }, [])
     } else {
         console.log('参数不是数组！')
     }
}

function flattenArray(targetArray) {
    if ( targetArray && Array.isArray(targetArray) ) {
        return  targetArray.reduce((accumulator, current) => {
            return accumulator.concat(Array.isArray(current)?flattenArray(current):current)
        }, [])
     } else {
         console.log('参数不是数组！')
     }
}

let arr1 = [1,1,2,2,4,7,8,7]
console.log(countsArray(arr1))
console.log(removeRepeatInArray(arr1))
let arr2 = [1,[3,5],null, undefined, '12',[5], [[1,2]],{a:1}]
console.log(flattenArray(arr2))