const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const pizzaServerPath = "/Users/aizhuxue/webdev/100Devs/class37-materials/pizza-server"
const pizzaMenu = {
  "cheese" : `${pizzaServerPath}/cheese-pizza.png`,
  "pepperoni" : `${pizzaServerPath}/pepperoni-pizza.png`,
  "cb-ranch" : `${pizzaServerPath}/cb-ranch.png`
}

const server = http.createServer((req, res) => {
  const respondHTML = (filename) => {
    fs.readFile(filename, function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  };

  const respondWithPizzaJSON = order => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    console.log(pizzaMenu[order]);
    const objToJson = {
      url: pizzaMenu[order]
    }
    res.end(JSON.stringify(objToJson));
  };

  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log('server.js ' + page);
  if (page == '/') {
    respondHTML('index.html');
  }
  else if (page == '/api') {
    if ('pizza' in params) {
      if (params['pizza'] === 'cheese') {
        respondWithPizzaJSON('cheese')
      }//student = leon
      else if (params['pizza'] === 'pepperoni') {
        respondWithPizzaJSON('pepperoni')
      }
      else if (params['pizza'] === 'chicken bacon ranch') {
        respondWithPizzaJSON('cb-ranch')
      }
    }//student if
  }//else if
  else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });
  } else if (page === '/assets/cb-ranch.png') {
    fs.readFile("/Users/aizhuxue/webdev/100Devs/class37-materials/pizza-server/assets/cb-ranch.png", function (err, content) {
      if (err) {
        res.writeHead(400, {"Content-type": "text/html"});
        console.log(err);
        res.end("No such image");
      } else {
        //specify the content type in the response will be an image
        res.writeHead(200,{"Content-type": "image/jpg"});
        res.end(content);
      }
    });
  }  else if (page === '/assets/pepperoni-pizza.jpg') {
    fs.readFile("/Users/aizhuxue/webdev/100Devs/class37-materials/pizza-server/assets/pepperoni-pizza.jpg", function (err, content) {
      if (err) {
        res.writeHead(400, {"Content-type": "text/html"});
        console.log(err);
        res.end("No such image");
      } else {
        //specify the content type in the response will be an image
        res.writeHead(200,{"Content-type": "image/jpg"});
        res.end(content);
      }
    });
    } else if (page === '/assets/cheese-pizza.png') {
    fs.readFile("/Users/aizhuxue/webdev/100Devs/class37-materials/pizza-server/assets/cheese-pizza.png", function (err, content) {
      if (err) {
        res.writeHead(400, {"Content-type": "text/html"});
        console.log(err);
        res.end("No such image");
      } else {
        //specify the content type in the response will be an image
        res.writeHead(200,{"Content-type": "image/jpg"});
        res.end(content);
      }
    });
  } else {
    figlet('404!!', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
