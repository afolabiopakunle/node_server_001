const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempFoodCard = fs.readFileSync(`${__dirname}/templates/template_food.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template_product.html`, 'utf-8');

const server = http.createServer((req, res) => {
    console.log(req.url);
    const { query, pathname } = url.parse(req.url, true);
    console.log('pathname', pathname);
    if(pathname === '/' || req.url === '/overview') {
        res.writeHead(200, {
            'content-type': 'text/html',
        })

        const cardsHTML = dataObj.map(food => replaceTemplate(tempFoodCard, food)).join('');
        const output = tempOverview.replace(/{{FOOD_CARD}}/g, cardsHTML);
        res.end(output);
    } else if (pathname === '/api') {
        res.writeHead(200, {
            'content-type': 'application/json',
        })
        res.end(data);
    } else if (pathname === '/overview') {
        res.writeHead(200, {
            'content-type': 'text/html'
        })
    } else if (pathname === '/product') {
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.writeHead(200, {
            'content-type': 'text/html',
        })
        res.end(output)
    } else {
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.end('<h4>Page not found</h4>')
    }
});

server.listen(3000, '127.0.0.1', () => console.log('it works'));
