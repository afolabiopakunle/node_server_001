const fs = require('fs');
const http = require('http');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempFoodCard = fs.readFileSync(`${__dirname}/templates/template_food.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template_product.html`, 'utf-8');

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{{PRODUCT_NAME}}/g, product.productName);
    output = output.replace(/{{IMAGE}}/g, product.image);
    output = output.replace(/{{PRICE}}/g, product.price);
    output = output.replace(/{{FROM}}/g, product.from);
    output = output.replace(/{{NUTRIENTS}}/g, product.nutrients);
    output = output.replace(/{{QUANTITY}}/g, product.quantity);
    output = output.replace(/{{DESCRIPTION}}/g, product.description);
    output = output.replace(/{{ID}}/g, product.id);
    output = output.replace(/{{QUANTITY}}/g, product.quantity);

    if(!product.organic) output = output.replace(/{{NOT_ORGANIC}}/g,'not-organic');

    return output
}
const server = http.createServer((req, res) => {
    if(req.url === '/' || req.url === '/overview') {
        res.writeHead(200, {
            'content-type': 'text/html',
        })

        const cardsHTML = dataObj.map(food => replaceTemplate(tempFoodCard, food));
        console.log(cardsHTML);
        res.end(tempOverview);
    } else if (req.url === '/api') {
        res.writeHead(200, {
            'content-type': 'application/json',
        })
        res.end(data);
    }
});

server.listen(3000, '127.0.0.1', () => console.log('it works'));
