var express = require("express");
var app = express();

var MongoClient = require('mongodb').MongoClient;

var SistemaDAO = require('./dao/SistemaDAO.js');
var SistemaSetup = require('./SistemaSetup.js');

var routesConfig = function(app) {
    app.route('/restaurante')
          .get(function(request, response) {
            SistemaDAO.listar(SistemaSetup.TABELAS.RESTAURANTE, function(result) {
                //console.log(result); //tojson
                //console.log(JSON.parse(result)); //to object
                response.send(result);
            });
          })
          .post(function(request, response) {
            SistemaDAO.inserir(SistemaSetup.TABELAS.RESTAURANTE, request.body, function(result) {
                response.send(result);
            });
          });

   app.route('/restaurante/:id')
         .delete(function(request, response) {
                var idString = request.params.id;
                SistemaDAO.excluir(SistemaSetup.TABELAS.RESTAURANTE, idString, function(result) {
                    response.sendStatus(result);
                });
          })
          .get(function(request, response) {
            var idString = request.params.id;  

            SistemaDAO.buscarPorId(SistemaSetup.TABELAS.RESTAURANTE, idString, function(result) {
                response.send(result);
            });
          });

    app.route('/restaurantes/pesquisar')
          .post(function(request, response) {
            SistemaDAO.pesquisar(SistemaSetup.TABELAS.RESTAURANTE, request.body, function(result) {
                response.send(result);
            });
          });
    
};//fim routesconfig

module.exports = routesConfig;
