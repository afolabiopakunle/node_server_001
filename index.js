const fs = require('fs');
const http = require('http');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);

const server = http.createServer((req, res) => {
    if(req.url === '/' || req.url === '/overview') {
        res.writeHead(200, {
            'content-type': 'text/html',
        })
        res.end('<h3>Welcome to overview</h3>');
    } else if (req.url === '/api') {
        res.writeHead(200, {
            'content-type': 'application/json',
        })
        res.end(data);
    }
});

server.listen(3000, '127.0.0.1', () => console.log('it works'));
