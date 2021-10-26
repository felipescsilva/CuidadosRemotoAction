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
service.listSchedule = listSchedule;
service.update = update;
service.delete = _delete;

module.exports = service;


function create(scheduleParam) {
    var deferred = Q.defer();
    var schedule = global.conn.collection("Schedule");
    // validation
    schedule.findOne(
        { scheduleName: scheduleParam.scheduleName },
        function (err, person) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (person) {
                // username already exists
                deferred.reject('scheduleName "' + scheduleParam.scheduleName + '" is already taken');
            } else {
                createSchedule();
            }
        });

    function createSchedule() {
        schedule.insertOne(
            scheduleParam,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();
    var schedule = global.conn.collection("Schedule");
    schedule.findOne({ _id: new ObjectID.createFromHexString(_id) }, function (err, person) {
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


function listSchedule() {
    var deferred = Q.defer();
    var schedule = global.conn.collection("Schedule");

    schedule.find().toArray(function (err, schedule) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (schedule) {
            // return user (without hashed password)
            deferred.resolve(schedule);
        } else {
            // user not found
            deferred.resolve();
        }
    });
    return deferred.promise;
}


function update(personParam) {
    var deferred = Q.defer();
    var schedule = global.conn.collection("Schedule");
    // validation
    schedule.findOne({ _id: new ObjectID.createFromHexString( personParam._id) }, function (err, person) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (person) {
            updateSchedule();
        }
    });

    function updateSchedule() {
        // fields to update
        var set = lodash.omit(personParam, '_id');

        schedule.updateOne(
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
    var schedule = global.conn.collection("Schedule");
    schedule.deleteOne(
        { _id: new ObjectID.createFromHexString(_id) },
        function (err) {
            if (err) {
                deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve();
        });

    return deferred.promise;
}

