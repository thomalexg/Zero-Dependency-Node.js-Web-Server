const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/index.html' || req.url === '/') {
    res.write(fs.readFileSync('./public/index.html'));
    res.end();
  } else if (req.url === '/index.css') {
    res.write(fs.readFileSync('./public/index.css'));
    res.end();
  } else if (req.url === '/memes' || req.url === '/memes/index.html') {
    res.write(fs.readFileSync('./public/memes/index.html'));
    res.end();
  } else if (req.url === '/1.png') {
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(fs.readFileSync('./public/memes/1.png'));
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
