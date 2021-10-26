var config = require('config.json');
var Q = require('q');
var lodash = require('lodash');
var connection = process.env.connectionStringV2 || config.connectionStringV2;
var database = process.env.databaseV2 || config.databaseV2;
const ObjectID = require('mongodb').ObjectID;
const mongo = require('mongodb').MongoClient;
mongo.connect(connection, { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db(database))
    .catch(err => console.log(err));


var service = {};
service.create = create;
service.getById = getById;
service.listCustomer = listCustomer;
service.update = update;
service.delete = _delete;

module.exports = service;


function create(customerParam) {
    var deferred = Q.defer();
    var customer = global.conn.collection("Customer");
    // validation
    customer.findOne(
        { client: customerParam.client },
        function (err, person) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (person) {
                // username already exists
                deferred.reject('Client "' + customerParam.client + '" is already taken');
            } else {
                createCustomer();
            }
        });

    function createCustomer() {
        customer.insertOne(
            customerParam,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();
    var customer = global.conn.collection("Customer");
    customer.findOne({ _id: new ObjectID.createFromHexString(_id) }, function (err, person) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (person) {
            // return user (without hashed password)
            deferred.resolve(person);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}


function listCustomer() {
    var deferred = Q.defer();
    var customer = global.conn.collection("Customer");

    customer.find().toArray(function (err, customer) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (customer) {
            // return user (without hashed password)
            deferred.resolve(customer);
        } else {
            // user not found
            deferred.resolve();
        }
    });
    return deferred.promise;
}


function update(personParam) {
    var deferred = Q.defer();
    var customer = global.conn.collection("Customer");
    // validation
    customer.findOne({ _id: new ObjectID.createFromHexString( personParam._id) }, function (err, person) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (person) {
            updatePerson();
        }
    });

    function updatePerson() {
        // fields to update
        var set = lodash.omit(personParam, '_id');

        customer.updateOne(
            { _id:new ObjectID.createFromHexString( personParam._id) },
            { $set: set },
            function (err, doc) {
                if (err) {
                    deferred.reject(err.name + ': ' + err.message);
                }

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();
    var customer = global.conn.collection("Customer");
    customer.deleteOne(
        { _id: new ObjectID.createFromHexString(_id) },
        function (err) {
            if (err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve();
        });

    return deferred.promise;
}

