const uc = require('upper-case');
const http = require('http');
const port = 8080;
const headers = {
  'Content-Type':'text/html'
};

const server = http.createServer((req,res)=> {
  res.writeHead(200, headers);
  res.write(uc(req.url));
  res.end();
});

server.listen(port);
console.log(`server is listening on port ${port}`);
