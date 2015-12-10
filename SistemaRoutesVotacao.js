var express = require("express");
var app = express();

var MongoClient = require('mongodb').MongoClient;

var SistemaDAO = require('./dao/SistemaDAO.js');
var SistemaSetup = require('./SistemaSetup.js');

var routesConfig = function(app) {
    app.route('/sistema/votacao')
          .get(function(request, response) {
            SistemaDAO.listar(SistemaSetup.TABELAS.VOTACAO, function(result) {
                //console.log(result); //tojson
                //console.log(JSON.parse(result)); //to object
                response.send(result);
            });
          })
          .post(function(request, response) {
            SistemaDAO.inserir(SistemaSetup.TABELAS.VOTACAO, request.body, function(result) {
                response.send(result);
            });
          });

   app.route('/sistema/votacao/:id')
         .delete(function(request, response) {
                var idString = request.params.id;
                SistemaDAO.excluir(SistemaSetup.TABELAS.VOTACAO, idString, function(result) {
                    response.sendStatus(result);
                });
          })
          .get(function(request, response) {
            var idString = request.params.id;  

            SistemaDAO.buscarPorId(SistemaSetup.TABELAS.VOTACAO, idString, function(result) {
                response.send(result);
            });
          });

    app.route('/sistema/votacaos/pesquisar')
          .post(function(request, response) {
            SistemaDAO.pesquisar(SistemaSetup.TABELAS.VOTACAO, request.body, function(result) {
                response.send(result);
            });
          });
    
};//fim routesconfig

module.exports = routesConfig;