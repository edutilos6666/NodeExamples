const http = require('http');

var postData = JSON.stringify({
  id:1,
  name: "foo",
  age: 10,
  wage: 100.0,
  active: "true"
});
var options = {
  method: 'POST',
  host: 'localhost',
  port: '8080',
  path: '/students',
  headers: {
   'Content-Type': 'application/x-www-form-urlencoded'
 }
};


// request object
var req = http.request(options, function (res) {
  var result = '';
  res.on('data', function (chunk) {
    result += chunk;
  });
  res.on('end', function () {
    console.log(result);
  });
  res.on('error', function (err) {
    console.log(err);
  })
});

// req error
req.on('error', function (err) {
  console.log(err);
});

//send request witht the postData form
req.write(postData);
req.end();

// const callback = (response)=> {
//   let body = '';
//   response.on('data', (data)=> {
//     body += data;
//   });
//
//   response.on('end', ()=> {
//     console.log(body);
//   });
// };
//
//
//
// const req = http.request(options, callback);
// req.write(postData);
// req.end();
