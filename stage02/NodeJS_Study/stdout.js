// const fs = require('fs');
// const zlib = require('zlib');
// fs.createReadStream('nodejs.md')
// .pipe(zlib.createGzip())
// .pipe(process.stdout)

// process.stdin.pipe(process.stdout)

// console.log(process.execPath)
// console.log(process.execArgv)

process.nextTick(function() {
    console.log('下一次Event Loop即将开始!');
})
setTimeout(function () {
    console.log('已经到了下一轮Event Loop！');
  }, 0)
console.log('1');

/**
setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
 */
