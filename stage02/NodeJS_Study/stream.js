// var Readable = require('stream').Readable;

// var rs = new Readable();
// rs.push('beep ');
// rs.push('boop\n');
// rs.push(null);

// rs.pipe(process.stdout);

// var fs = require('fs');
// var readableStream = fs.createReadStream('b.md');
// var data = '';

// readableStream.setEncoding('utf8');

// readableStream.on('data', function(chunk) {
//   data+=chunk;
// });

// readableStream.on('end', function() {
//   console.log(data);
// });

// var fs = require('fs');
// var readableStream = fs.createReadStream('b.md');
// var data = '';
// var chunk;

// readableStream.setEncoding('utf8');

// readableStream.on('readable', function() {
//   while ((chunk=readableStream.read()) !== null) {
//     data += chunk;
//   }
// });

// readableStream.on('end', function() {
//   console.log(data)
// });

