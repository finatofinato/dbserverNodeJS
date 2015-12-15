var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var RoutesRestaurante = require('./SistemaRoutesRestaurante.js');
var RoutesVotacao = require('./SistemaRoutesVotacao.js');

//pro cliente ter autorizacao de chamar http
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, HEAD, OPTIONS");
  res.header("Content-Type", "application/json");
  next();
});

//pra parsear json no body
app.use(bodyParser.json());

//todas as rotas sao chamadas aqui
RoutesRestaurante(app);
RoutesVotacao(app);

//inicializar o servidor
var server = app.listen(9009);
console.log("SistemaServer Running...");
