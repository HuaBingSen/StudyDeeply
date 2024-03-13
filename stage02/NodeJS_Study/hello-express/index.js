const express = require('express')
const app = express()
const routesMath = require('./routers')(app)
// app.use(express.static(__dirname + '/public'))
app.listen(8080, () =>{
    console.log('express服务器启动于8080端口');
})