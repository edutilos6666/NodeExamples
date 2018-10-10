const http = require('http');
const fs = require('fs');
const url = require('url');

const headers = {
  'Content-Type':'text/html'
};
const port = 8080;
const server = http.createServer((req,res)=> {
  res.writeHead(200, headers);
  // res.write('<h1>Hello World!</h1>');
  // res.end();
  console.log(url.parse(req.url,true));
  res.write(`req.url = ${req.url}<br>`);
  res.write(`__dirname = ${__dirname}<br>`);
  const query = url.parse(req.url, true).query;
  res.write(`query = ${query.id}, ${query.name},${query.age},${query.wage}<br>`);
  fs.createReadStream('static/People.html').pipe(res);
});

server.listen(port);
console.log(`Server is listening on port ${port}`);
