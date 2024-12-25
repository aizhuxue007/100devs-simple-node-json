const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const respondHTML = (filename) => {
    fs.readFile(filename, function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  };

  const writeInputJSON = (isLeon) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const objToJson = {
      name: isLeon ? "leon" : 'unknown',
      status: isLeon ? "Boss Man" : "unknown",
      currentOccupation: isLeon ? "Baller" : "unknown"
    }
    res.end(JSON.stringify(objToJson));
  };

  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    respondHTML('index.html');
  }
  else if (page == '/otherpage') {
    respondHTML('otherpage.html');
  }
  else if (page == '/otherotherpage') {
    respondHTML('otherotherpage.html');
  }
  else if (page == '/api') {
    if ('student' in params) {
      if (params['student'] == 'leon') {
        writeInputJSON(true);
      }//student = leon
      else if (params['student'] != 'leon') {
        writeInputJSON(false);
      }//student != leon
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
