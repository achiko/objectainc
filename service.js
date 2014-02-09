


exports.findRO = function(req, res) {
    
    var query = require('url').parse(req.url,true).query;
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
    db.collection('alpinero', function(err, collection) {
        collection.find(mongoQuery,mongoProjection).toArray(function(err, item) {
            console.log(item);
            res.jsonp(item);
        });
    });

    
};

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