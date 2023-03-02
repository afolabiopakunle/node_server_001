const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if(pathName === '/overview' || pathName === '/') {
        res.writeHead(404, {
            'content-type': 'text/html',
        });
        res.end('<h2>Welcome to overview</h2>');
    } else {
        res.writeHead(404, {
            'content-type': 'text/html'
        });
        res.end('<h4>Page not found</h4>');
    }
});

server.listen(3000, '127.0.0.1', () => console.log('Up and running'));
