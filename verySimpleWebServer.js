let http = require('http');
let fs = require('fs');
let path = require('path');
let port = 8080;

let server = http.createServer(requestHandler);

server.listen(port, (err) =>{
  if (err) {
    console.error('Error upon opening the port.');
  }
  console.log(`Server is listening to port ${port}!`);

});

function requestHandler(req, res) {
  let pathName = req.url;
  if (pathName == '/') {
    pathName = '/index.html';
  }

  reqExt = path.extname(pathName);
  let extTypes = {
    '.html':'text/html',
    '.css':'text/css',
    '.js':'text/js',
    '.jpeg':'image/jpeg',
    '.png':'image/png',
    '.ico':'image/x-icon'
  }

  let contentType = extTypes[reqExt] || 'text/plain';

  fs.readFile(__dirname + pathName, (err, data)=>{
    if (err) {
      res.writeHead(500);
      res.end('Error serving file!');
    }
    res.writeHead(200, {'Content-Type':contentType});
    res.end(data);
  });

}
