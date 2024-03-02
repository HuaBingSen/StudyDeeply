function* objectEntries(obj) {
    let keys = Object.keys(obj) 
    for(let key of keys) {
        yield [key, obj[key]]
    }
}

let hbs = { first: 'Hua', last: 'BingSen' }  
for(let [key, value] of objectEntries(hbs)) {
    console.log(`${key}:${value}`)
}