var http = require("http");
var url = require("url");
var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;
var MongoServer = require('mongodb').Server;
var MongoDb = require('mongodb').Db;
var url = 'mongodb://localhost/dbserver';


//pro cliente ter autorizacao de chamar http
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.route('/teste')
  .get(function(request, response) {
    var result = '';
	
	var busca = function(callback) {
		MongoClient.connect(url, function(err, db) {
   			console.log("Connected to server.");
	
             db.collection('colecaos').find({}).toArray(function(err, items) {
			    callback(JSON.stringify(items));
            });
		});
	};

	busca(function(result) {
		console.log(result); //tojson
        //console.log(JSON.parse(result)); //to object
        
        response.send(result);
        response.end();
	});
  })
  .post(function(req, res) {
        
    var busca = function(callback) {
		MongoClient.connect(url, function(err, db) {
   			console.log("Connected to server.");
	
            db.collection('colecaos').find({}).toArray(function(err, items) {
				callback(JSON.stringify(items));
            });
		});
	};

	busca(function(result) {
		console.log(result);
        	response.send(result);
        	response.end();
	});
  });




var server = app.listen(9009);
console.log("TesteNode Running...");
