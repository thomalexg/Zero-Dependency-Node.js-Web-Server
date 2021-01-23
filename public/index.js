const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/index.html' || req.url === '/') {
    res.write(fs.readFileSync('./index.html'));
    res.end();
  } else if (req.url === '/index.css') {
    res.write(fs.readFileSync('./index.css'));
    res.end();
  } else if (req.url === '/memes' || req.url === '/memes/index.html') {
    res.write(fs.readFileSync('./memes/index.html'));
    res.end();
  }
  // else if (req.url === '/1.jpg') {
  //   fs.readFile('./memes/1.jpg', (error, data) => {
  //     if (error) throw error;
  //     res.writeHead(200, { 'Content-Type': 'image/jpeg' });
  //     res.write(data);
  //     res.end();
  //   });
  // }
  else if (req.url === '/1.jpg') {
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(fs.readFileSync('./memes/1.jpg'));
  } else {
    res.write(JSON.stringify(404));
    res.end();
  }
});

server.listen(3000);

console.log('server running on port 3000...');
