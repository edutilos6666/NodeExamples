const http = require('http');

var options = {
  host: 'localhost',
  port: '8080',
  path: '/'
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

//GET: /
var req = http.request(options, callback);
req.end();

//POST: /
options = {
  method: 'POST',
  host: 'localhost',
  port: '8080',
  path: '/'
};
req = http.request(options, callback);
req.end();

//PUT: /
options = {
  method: 'PUT',
  host: 'localhost',
  port: '8080',
  path: '/'
};
req = http.request(options, callback);
req.end();


//DELETE: /
options = {
  method: 'DELETE',
  host: 'localhost',
  port: '8080',
  path: '/'
};
req = http.request(options, callback);
req.end();

//GET: /bar
options = {
  method: 'GET',
  host: 'localhost',
  port: '8080',
  path: '/bar'
};
req = http.request(options, callback);
req.end();

//GET: /bim
options = {
  method: 'GET',
  host: 'localhost',
  port: '8080',
  path: '/bim'
};
req = http.request(options, callback);
req.end();

//GET: /bimbim
options = {
  method: 'GET',
  host: 'localhost',
  port: '8080',
  path: '/bimbim'
};
req = http.request(options, callback);
req.end();


//GET: /foo
options = {
  method: 'GET',
  host: 'localhost',
  port: '8080',
  path: '/foo'
};
req = http.request(options, callback);
req.end();

//GET: /afoo
options = {
  method: 'GET',
  host: 'localhost',
  port: '8080',
  path: '/afoo'
};
req = http.request(options, callback);
req.end();

//GET: /foobar
options = {
  method: 'GET',
  host: 'localhost',
  port: '8080',
  path: '/foobar'
};
req = http.request(options, callback);
req.end();
