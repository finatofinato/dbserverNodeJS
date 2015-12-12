var express = require("express");
var app = express();

var MongoClient = require('mongodb').MongoClient;

var SistemaDAO = require('./dao/SistemaDAO.js');
var SistemaSetup = require('./SistemaSetup.js');
var urldb = require('./SistemaSetup.js').URL_DB;

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
    
    app.route('/sistema/votacaos/restaurantesJaUtilizados')
      .post(function(request, response) {
            var callback = function(result) {
                response.send(result);
            };

            MongoClient.connect(urldb, function(err, db) {
                var execSql = function(err, items) {
                    var execSql2 = function(err2, items2) {
                        callback(JSON.stringify(items2));  
                    };
                    
                    //transforma em array de ids
                    var idsToArray = function(resultados) {
                        var ObjectId = require('mongodb').ObjectID;
                        var ret = [];
                        for (var i=0; i<resultados.length; i++) {
                            ret.push(new ObjectId(resultados[i].restaurante._id));
                        }
                        return ret;
                    };

                    //busca todos os restaurantes que NAO estao nos resultados desta semana
                    MongoClient.connect(urldb, function(err2, db) {
                        var idsArray = idsToArray(items);
                        db.collection(SistemaSetup.TABELAS.RESTAURANTE).find(
                            { _id: {$nin: idsArray} }
                        ).toArray(execSql2)
                    });        
                };

                var itemJson = request.body;
                //busca todos os resultados desta semana
                db.collection(SistemaSetup.TABELAS.RESULTADOS).find(
                    { data: { $gt: itemJson.data } } 
                ).toArray(execSql);
            });
      });

    
};//fim routesconfig

module.exports = routesConfig;