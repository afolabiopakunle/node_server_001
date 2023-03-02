const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Welcome Afolabi');
});

server.listen(3000, '127.0.0.1',() => console.log('Up and running'));
