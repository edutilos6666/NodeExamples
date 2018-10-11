const http = require('http');

let options = {
  host: 'localhost',
  port: '8080',
  path: '/test2.xml'
};

const callback = (response)=> {
  let body = '';
  response.on('data', (data)=> {
    body += data;
  });

  response.on('end', ()=> {
    console.log(body);
  });
};

let req = http.request(options, callback);
req.end();

options = {
 host: 'localhost',
 port: '8080',
 path: '/styles/example1.css'
};
req = http.request(options, callback);
req.end();
