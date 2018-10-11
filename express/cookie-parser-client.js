const http = require('http');

const cookies = "id=1&name=foo&age=10&wage=100.0&active=true";
const options = {
  method: 'GET',  //default anyways
  host: 'localhost',
  port: '8080',
  path: '/',
  headers: {
    'Cookie': cookies
  }
};

const callback = (response)=> {
  let body = '';
  response.on('data', (data)=> {
    body += data;
  });

  response.on('end', ()=> {
    console.log(body);
    body = body.substring(1);
    body = body.substring(0, body.length-1);
    const pairs = body.split("&");
    pairs.forEach(pair=> {
      const keyValue = pair.split("=");
      const key = keyValue[0];
      const value = keyValue[1];
      console.log(`key = ${key}, value = ${value}`);
    });
  });
};

const req = http.request(options, callback);
req.end();
