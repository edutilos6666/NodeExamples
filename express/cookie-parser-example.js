const express = require('express');
const coookieParser = require('cookie-parser');

const app = express();
app.use(coookieParser());

app.get('/', (req, res)=> {
  console.log(`<<Cookies>>`);
  console.dir(req.cookies);
  res.end(JSON.stringify(req.cookies));
});

const port = "8080";

const server = app.listen(port, ()=> {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Express server is listening on ${host}:${port}`);
});
