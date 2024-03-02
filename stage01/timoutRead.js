const p = Promise.race([
    fetch('/resource/user.js'),
    new Promise((resolve, reject) => {
        // 超时提示（定时器+reject错误信息）
        setTimeout(()=>{
            reject(new Error('读取文件已超时'))
        }, 5000)
    })
])
p
.then( v => console.log(v))
.catch(err => console.log(err))