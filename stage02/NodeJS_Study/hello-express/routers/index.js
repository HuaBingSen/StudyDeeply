module.exports = function(app) {
    app.get('/', (req, res) => {
        res.send('hello express')
        res.end()
    })
    app.get('/customer', (req, res) => {
        res.send('hello customer')
        res.end()
    })
    app.get('/admin', (req, res) => {
        res.send('hello admin')
        res.end()
    })
}