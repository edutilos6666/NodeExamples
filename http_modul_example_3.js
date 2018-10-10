const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const port = 8080;
const headers = {
  'Content-Type': 'text/html'
};
const server = http.createServer((req, res)=> {

  const _url = url.parse(req.url);
  const pathname = _url.pathname;
  const filename = path.join(__dirname,'/static/',pathname);

  fs.exists(filename, (exists)=> {
    if(exists) {
      res.writeHead(200,headers);
      fs.createReadStream(filename).pipe(res);
    } else {
      res.writeHead(404,headers);
      fs.createReadStream('static/404.html').pipe(res);
    }
  });
});

server.listen(port);
console.log(`server is listening on port ${port}`);
