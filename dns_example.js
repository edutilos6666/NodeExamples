const dns = require("dns");
const url = "www.google.com";

dns.lookup(url, (err, address, family) => {
  if(err) throw err;
  console.log(address, family);
  dns.reverse(address, (err, hostnames)=> {
    if(err) throw err;
    console.log(`Reverse for ${address}: ${JSON.stringify(hostnames)}`);
  });
});
