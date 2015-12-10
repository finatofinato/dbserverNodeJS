var http = require("http");
var url = require("url");
var express = require("express");
var mongoose = require("mongoose");
var app = express();

var MongoClient = require('mongodb');
console.log(MongoClient);



var GlobalAppRequires = {
	url : url,
	express : express,
	mongoose : mongoose,
	app : app
}

var models = require("./Models.js");

app.route('/teste')
  .get(function(request, response) {
    //res.send('Get a random book');
	response.writeHead(200, {"Content-Type": "text/plain"});
    
        var result = "";

	var conn = mongoose.createConnection('mongodb://localhost/dbserver');

	conn.on('error', console.error.bind(console, 'connection error:'));

	conn.once('open', function (callback) {
		
		console.log("conectou...");

		var stream = models.colecaos.find().where('email').eq('finatofinato@yahoo.com.br');

		stream.on('data', function (doc) {
			console.log("doc: " + doc);
			result = doc;
		}).on('error', function (err) {
			console.log("Erro: "+err);
		}).on('close', function () {
			console.log("close ");
		});
	});



        response.write(result);
        response.end();
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });




var server = app.listen(9009);
console.log("TesteNode Running...");
