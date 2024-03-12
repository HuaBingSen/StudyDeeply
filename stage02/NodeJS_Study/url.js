const url1 = 'https://example.org/abc.html?d=e#fgh'
const myURL = new URL(url1)
let { pathname, search, hash  } = myURL
console.log(pathname)
console.log(search)
console.log(hash)


