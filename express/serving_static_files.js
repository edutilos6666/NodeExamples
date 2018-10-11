const express = require('express');
const app = express();
const port = 8080;
app.use(express.static('../public'));

app.get('/', (req,res)=> {
  res.send('Hello World static');
});

const server = app.listen(port, ()=> {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Express server is listening on ${host}:${port}.`);
});
