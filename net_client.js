const net = require('net');
const port = 8080;
const client = net.connect({port:port}, () => {
  console.log("connected to server!");
});

client.on("data", (data)=> {
  console.log(data.toString());
  client.end();
});

client.on("end", ()=> {
  console.log("disconnected from server");
});
