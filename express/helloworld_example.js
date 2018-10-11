const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req,res)=> {
  res.send('Hello World');
});


const server = app.listen(port, ()=> {
  console.dir(server);
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Express Server is running on ${host}:${port}`);
});
