const http = require('http');
const {spawn} = require('child_process')

http.createServer(function (req, res) {
    const child = spawn('git',['pull','origin','master']);
    child.stdout.on('data', data => res.write(data) )
    child.stderr.on('data', data => res.write('ERROR => '+data) )
    child.on('exit', ()=>res.end())
}).listen(9000);