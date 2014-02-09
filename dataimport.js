////// Import sample data into database 

var mongo = require('mongodb');
var fs 		= require('fs');
var _ 		= require('underscore');


//////  Mongodb part /////
var Server = mongo.Server,  Db = mongo.Db,  BSON = mongo.BSONPure;
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('mitchell', server);
 
db.open(function(err, db) {
    if(!err) {
        
	       console.log("Connected to 'Mitchelle' database");
	       dataImport(db);

        // db.collection('alpinero', {strict:true}, function(err, collection) {            
        //     if (err) {
        //         console.log("The 'alpinero' collection doesn't exist. Creating it with sample data...");
        //     }
        // });

    }
});




function readData(callback) {

		fs.readFile('./web/API/searchresult.txt', 'utf8', function (err, data) {

		  		 if (err) return callback(err)
		       callback(null, data)

		});
}



dataImport = function(db) {


		readData(function(err, result){
				console.log('loaded...');
				var data = JSON.parse(result);

				var collection = db.collection('alpinero');


					_.map(data, function(item){ 

							console.log(item.ro_i);

								var dbrow =  {

															 "alpine_ro_i" 			: item.ro_i,
			                         "model_i" 					: item.model_i,
			                         "serial_number_i" 	: item.serial_number_i,
			                         "phone1_i" 				: item.phone1_i,
			                         "phone2_i" 				: item.phone2_i,
			                         "vin_i" 						: item.vin_i,
			                         "datasource" 			: "",
			                      
		                      	};


    					collection.insert(dbrow, function(err, docs) {  

    								if(err) {  console.log(err) }
    								console.log('Ok !');
    					});
      

					});

		});

	


		//console.log('1. Read data From file');
		//console.log('2. Parse Data');
		//console.log('3. Insert into database');

}


