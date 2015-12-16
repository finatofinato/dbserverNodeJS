//i am using here the mongodb database
//create the database with the name 'dbserver'
use dbserver

//create the collections below
db.createCollection("restaurantes", { autoIndexID : true } )
db.createCollection("votacaos", { autoIndexID : true } )
db.createCollection("resultados", { autoIndexID : true } )


//the structure of each collection is like this:
restaurante
	id
	nome (string)

votacao
	id
	data (integer)
	email (string)
	restaurante (id, nome)

resultados
	data (integer)
	restaurante (id, nome)


//if you don't have already installed, do it:
sudo brew install nodejs
sudo npm install bower
sudo npm install grunt-cli

//to update the required dependencies 
npm install
bower install

//run with node
node SistemaServer.js

//all the routes (rest) are in the SistemaRoutes*.js files
//you can test them with POSTMAN or something like that, all with json format
//on address http://localhost:9009/
