const http = require('http');
const fs = require('fs');
http.createServer((request, response)=>{
    console.log('server start!');
    let url = request.url;
    if(request.url == '/'){
        url = '/index.html';
    }
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url))
}).listen(3000);