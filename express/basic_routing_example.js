const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res)=> {
  res.send(`GET: ${req.url}`);
});

app.post('/', (req, res)=> {
  res.send(`POST: ${req.url}`);
});

app.put('/', (req,res)=> {
  res.send(`PUT: ${req.url}`);
});

app.delete('/', (req, res)=> {
  res.send(`DELETE: ${req.url}`);
});

app.get('/b*', (req, res)=> {
  res.send(`GET(pattern matching): ${req.url}`);
});

app.get(/^\/f.{2}$/, (req, res)=> {
  res.send(`GET(regex): ${req.url}`);
});

const server = app.listen(port, ()=> {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Express server is listening on ${host}:${port}`);
});
