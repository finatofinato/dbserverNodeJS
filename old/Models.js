var mongoose = require("mongoose");

	var schemaColecaos = mongoose.Schema({ email: String });
	var models = {
		colecaos : mongoose.model('colecaos', schemaColecaos),
		finato : "oiiiii"
	};
	
module.exports = models;
