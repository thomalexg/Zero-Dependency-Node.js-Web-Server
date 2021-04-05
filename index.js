const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const request = req.url;
  if (request.slice(0, 6) !== '/memes') {
    try {
      if (request === '/') {
        res.write(fs.readFileSync('./public/index.html'));
        res.end();
      } else if (fs.existsSync(`./public${request}`)) {
        res.write(fs.readFileSync(`./public${request}`));
        res.end();
      } else {
        res.write(JSON.stringify(404));
        res.end();
      }
    } catch (error) {
      res.write(error);
      res.end();
    }
  } else if (request === '/memes') {
    res.write(fs.readFileSync('./public/memes/index.html'));
    res.end();
  } else if (fs.existsSync(`./public${request}`)) {
    res.write(fs.readFileSync(`./public/${request}`));
    res.end();
  } else {
    res.write(JSON.stringify(404));
    res.end();
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
