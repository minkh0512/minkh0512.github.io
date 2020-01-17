var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathName = url.parse(_url, true).pathname;
 
  if(pathName === '/'){
    console.log('has pathname' + queryData.id);
    if(queryData.id === undefined){
      console.log('has not data id');
      fs.readdir('./data', function(error, filelist){
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = '<ul>';
        var i = 0;
        while(i < filelist.length){
          list = list + `<li><a href="/?id="${filelist[i]}">${filelist[i]}</a></li>`;
          i++;
        }
        list = list + '</ul>';
        var template = `
          <!doctype html>
          <html>
          <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
          </head>
          <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <h2>${title}</h2>
          <p>${description}</p>
          </body>
          </html>
        `;

        response.writeHead(200);
        response.end(template);
      });
    }else{
      console.log('has data id' + queryData.id);
      fs.readdir('./data', function(error, filelist){
        var list = '<ul>';
        var i = 0;
        while(i < filelist.length){
          list = list + `<li><a href="/?id="${filelist[i]}">${filelist[i]}</a></li>`;
          i++;
        }
        list = list + '</ul>';
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
          console.log(queryData, description);
          var title = queryData.id;
          var template = `
            <!doctype html>
            <html>
            <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
            </head>
            <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
            </body>
            </html>
          `;
          response.writeHead(200);
          response.end(template);
        });
      });
    }
    
  }else{
    response.writeHead(404);
    response.end('Not Found');
  }
});
app.listen(3000);
