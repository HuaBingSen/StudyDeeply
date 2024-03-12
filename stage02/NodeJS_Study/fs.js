const fs = require('node:fs');
// const text = fs.readFileSync('./b.md', {
//     encoding: 'utf8',
//     flag: 'r'
// })
// console.log(text)



fs.watchFile('./b.md', function (curr, prev) {
  console.log('the current mtime is: ' + curr.mtime);
  console.log('the previous mtime was: ' + prev.mtime);
});

fs.writeFile('./b.md', "changed", function (err) {
  if (err) throw err;

  console.log("file write complete");   
});