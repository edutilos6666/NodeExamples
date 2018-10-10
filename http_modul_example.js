const http = require('http');
const port = 8080;
const server = http.createServer(function(req,res) {
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('Hello World');
});
server.listen(port);
console.log(`Server is listening on port ${port}`);
