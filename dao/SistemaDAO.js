var MongoClient = require('mongodb').MongoClient;
var urldb = require('../SistemaSetup.js').URL_DB;

var SistemaDAO = {
    
    listar : function(tabela, callback) {
        MongoClient.connect(urldb, function(err, db) {
             db.collection(tabela).find({}).toArray(function(err, items) {
                callback(JSON.stringify(items));
            });
        });
    },

    inserir : function(tabela, itemJson, callback) {
		MongoClient.connect(urldb, function(err, db) {
            db.collection(tabela).insertOne(itemJson, function(err, result) {
                if (result.result.ok != 1 && result.result.n != 1) {
                    itemJson._id = null;
                } 
                callback(JSON.stringify(itemJson));
            });
        });
    },
    
    excluir : function(tabela, idString, callback) {
		MongoClient.connect(urldb, function(err, db) {
            var ObjectId = require('mongodb').ObjectID;
            var idJson = { _id: new ObjectId(idString) };
            
            db.collection(tabela).deleteOne(idJson, function(err, result) {
                if (result.result.ok != 1 && result.result.n != 1 && result.deletedCount != 1) {
                    callback(0);
                } else {
                    callback(1);    
                }
            });
        });
    },

    buscarPorId : function(tabela, idString, callback) {
		MongoClient.connect(urldb, function(err, db) {
            var ObjectId = require('mongodb').ObjectID;
            var idJson = { _id: new ObjectId(idString) };
            
            db.collection(tabela).find(idJson).toArray(function(err, item) {
			    callback(JSON.stringify(item));
            });
		});
	},
    
    pesquisar : function(tabela, itemJson, callback) {
		MongoClient.connect(urldb, function(err, db) {
//console.log("itemJson : " + JSON.stringify(itemJson));
            db.collection(tabela).find(itemJson).toArray(function(err, items) {
//console.log("items.length: " + items.length);
                callback(JSON.stringify(items));
            });
		});
	}

};

module.exports = SistemaDAO;