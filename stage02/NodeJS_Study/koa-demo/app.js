const koa = require('koa')
const app = new koa()
app.use(function* (next) {
    // console.log(`this:${JSON.stringify(this)}`);
    console.log(this.path);
    if (this.path === '/') {
        this.body = 'welcome koa'
    } else {
        yield next
    }
})
const port = process.env.PORT || '3000'
app.listen(port, () => {
    console.log(`koa在${port}端口启动`);
})