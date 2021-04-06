const http = require('http');
const fs = require('fs');

function resFunc(res, request) {
  res.write(fs.readFileSync(`./public/${request}`));
  res.end();
}
function resFuncIndex(res, request) {
  res.write(fs.readFileSync(`./public/${request}/index.html`));
  res.end();
}
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
      if (request === '/') {
        resFuncIndex(res, request);
      } else {
        resFunc(res, request);
      }
    } else if (fs.lstatSync(`./public${request}`).isDirectory()) {
      resFuncIndex(res, request);
    } else {
      resFailed(res);
    }
  } catch (error) {
    resFailed(res);
  }
});

server.listen(3000);

console.log('server running on port 3000...');

// other way of writing the esle if:
// else if (req.url === '/1.jpg') {
//   fs.readFile('./memes/1.jpg', (error, data) => {
//     if (error) throw error;
//     res.writeHead(200, { 'Content-Type': 'image/jpeg' });
//     res.write(data);
//     res.end();
//   });
// }
