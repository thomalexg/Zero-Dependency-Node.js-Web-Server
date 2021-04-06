const http = require('http');
const fs = require('fs');

function resFailed(res) {
  res.statusCode = 404;
  res.write(JSON.stringify(404));
  res.end();
}

const server = http.createServer((req, res) => {
  const request = req.url;
  try {
    if (
      !fs.lstatSync(`./public${request}`).isDirectory() &&
      fs.existsSync(`./public${request}`)
    ) {
      res.write(fs.readFileSync(`./public${request}`));
      res.end();
    } else if (fs.lstatSync(`./public${request}`).isDirectory()) {
      res.write(fs.readFileSync(`./public${request}/index.html`));
      res.end();
    } else {
      resFailed(res);
    }
  } catch (error) {
    resFailed(res);
  }
});

server.listen(3000);

console.log('server running on port 3000...');
