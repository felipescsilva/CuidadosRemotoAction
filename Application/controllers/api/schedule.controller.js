var express = require('express');
var router = express.Router();
var scheduleService = require('services/schedule.service');

// routes
router.post('/', createSchedule);
router.get('/', listSchedule);
router.put('/', updateSchedule);
router.get('/:_id', getCurrentSchedule);
router.delete('/:_id', deleteSchedule);

module.exports = router;

function createSchedule(req, res) {
    scheduleService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function listSchedule(req, res) {

        scheduleService.listSchedule()
            .then(function (schedule) {
                if (schedule) {
                    res.send(schedule);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(function (err) {
                res.status(400).send(err);
            });
}

function getCurrentSchedule(req, res) {
    var scheduleID = req.params._id;
    scheduleService.getById(scheduleID)
        .then(function (schedule) {
            if (schedule) {
                res.send(schedule);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateSchedule(req, res) {
    scheduleService.update(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteSchedule(req, res) {
    var scheduleID = req.params._id;
    scheduleService.delete(scheduleID)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}