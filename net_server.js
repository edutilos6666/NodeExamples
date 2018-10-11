const net = require('net');
const port = 8080;
const server = net.createServer((connection)=> {
  console.log("client connected");
  connection.on("end", ()=> {
    console.log("client disconnected");
  });
  connection.write("Hello World!\n"+ new Date().toLocaleString());
  connection.pipe(connection);
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
