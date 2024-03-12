// var exec = require('child_process').exec;
// var child = exec('ls -l');

// child.stdout.on('data', function(data) {
//   console.log('stdout:' + data);
// });
// child.stderr.on('data', function(data) {
//   console.log('stdout: ' + data);
// });
// child.on('close', function(code) {
//   console.log('closing code: ' + code);
// });

var child_process = require('child_process');

var path = ".";
child_process.execFile('/bin/ls', ['-l', path], function (err, result) {
    console.log(result)
});