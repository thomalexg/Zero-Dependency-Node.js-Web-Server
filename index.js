const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const request = req.url;
  console.log('slicedit', request.slice(0, 6));
  console.log('hwat are yu doing', request.slice(0, 6) !== '/memes');

  if (request.slice(0, 6) !== '/memes') {
    console.log('pblic without memes');
    try {
      if (fs.existsSync(`./public${request}`)) {
        res.write(fs.readFileSync(`./public${request}`));
        res.end();
      } else {
        console.log(request);
        res.write(JSON.stringify(404));
        res.end();
      }
    } catch (error) {
      res.write(error);
      res.end();
    }
  } else if (request === '/memes') {
    console.log('only memes');
    res.write(fs.readFileSync('./public/memes/index.html'));
    res.end();
  } else if (fs.existsSync(`./public${request}`)) {
    console.log('index and more');
    res.write(fs.readFileSync(`./public/${request}`));
    res.end();
  } else {
    console.log(request);
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
