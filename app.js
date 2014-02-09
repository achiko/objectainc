console.log('Start !!!');

var express = require('express')  , http = require('http')  , path = require('path');
var app = express();
var mongo = require('mongodb');


//////  Mongodb part /////
var Server = mongo.Server,  Db = mongo.Db,  BSON = mongo.BSONPure;
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('mitchell', server);
 
db.open(function(err, db) {
    if(!err) {
        
        console.log("Connected to 'Mitchelle' database");

        db.collection('alpinero', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'mitchelle' collection doesn't exist. Creating it with sample data...");

            }
        });
    }
});
////  eof  mongodb part ////////  



app.configure(function() {
    
		app.set('views', __dirname + '/views');
	  app.set('view engine', 'jade');
	  app.use(express.favicon());
	  app.use(express.logger('dev'));
	  app.use(express.bodyParser());
	  app.use(express.methodOverride());
	  app.use(app.router);
	  //app.use(require('stylus').middleware(__dirname + '/public'));
	  app.use(express.static(__dirname + '/web'));
	  app.use(express.compress());

});


//-- Main Page 
app.get('/', function(request, res){

     res.sendfile("web/main.html");

});


//-- Search API 
app.get('/api/search', function(req,res){


		var query = require('url').parse(req.url,true).query;
		console.log('Query ? ', query);


    var alpine_ro_i = query.alpine_ro_i;
    var model_i = query.model_i;
    var serial_number_i = query.serial_number_i;
    var phone1_i = query.phone1_i;
    var phone2_i = query.phone2_i;
    var vin_i = query.vin_i;
    
    mongoQuery={};
    
    if (alpine_ro_i) mongoQuery["alpine_ro_i"]={"$regex":alpine_ro_i};
    if (model_i) mongoQuery["model_i"]={"$regex":model_i};
    if (serial_number_i) mongoQuery["serial_number_i"]={"$regex":serial_number_i};
    if (phone1_i) mongoQuery["phone1_i"]={"$regex":phone1_i};
    if (phone2_i) mongoQuery["phone2_i"]={"$regex":phone2_i};
    if (vin_i) mongoQuery["vin_i"]={"$regex":vin_i};
    
    var mongoProjection= {"alpine_ro_i" : "1",
                         "model_i" : "1",
                         "serial_number_i" : "1",
                         "phone1_i" : "1",
                         "phone2_i" : "1",
                         "vin_i" : "1",
                         "datasource" : "1",
                         "_id" : false };

    		console.log('Mongoquery: ',  mongoQuery);

				db.collection('alpinero', function(err, collection) {

	        collection.find(mongoQuery,mongoProjection).toArray(function(err, item) {
	            console.log(item);
	            res.jsonp(item);
	        });
		
		});

});


//-- Roi Details  API 

app.get('/api/getroidetails')

exports.getRODetail = function(req, res) {

    var query = require('url').parse(req.url,true).query;
    var alpine_ro_i = query.alpine_ro_i;
    mongoQuery={};
    if (alpine_ro_i) mongoQuery={"alpine_ro_i":{"$regex":alpine_ro_i}};
    db.collection('alpinero', function(err, collection) {
        collection.find(mongoQuery).toArray(function(err, item) {
            console.log(item);
            res.jsonp(item);
        });
    });

};








var port = process.env.PORT || 5000;

app.listen(port, function() {
	  console.log("Listening on " + port);
});
