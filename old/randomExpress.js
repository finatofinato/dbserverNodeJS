var http = require("http");
var url = require("url");
var express = require("express");

var app = express();

app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

app.get("/randomExpress", function (request, response) {
     	response.writeHead(200, {"Content-Type": "text/plain"});
	
     	var parsedUrl = url.parse(request.url, true);
	console.log("host: " + parsedUrl.host);
	console.log("hostname: " + parsedUrl.hostname);
	console.log("port: " + parsedUrl.port);
	console.log("pathname: " + parsedUrl.pathname);
	console.log("search: " + parsedUrl.search);
	console.log("path: " + parsedUrl.path);
	console.log("query: " + parsedUrl.query);
	console.log("hash: " + parsedUrl.hash);


	var result = calculo(parsedUrl);
	response.write(result);
     	response.end();
});




var server = app.listen(9009);

var calculo = function(parsedUrl) {
	var params = parsedUrl.query;
      	var input = params.number;

      	var numInput = new Number(input);
      	var numOutput = new Number(Math.random() * numInput).toFixed(0);
	return numOutput.toString();
};

var errorMessage = function() {
	return "URL inválida";	
};

console.log("Random Number Generator Running...");
