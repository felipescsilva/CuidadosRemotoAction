var express = require('express');
var router = express.Router();
var customerService = require('services/customer.service');

// routes
router.post('/', createCustomer);
router.get('/', listCustomer);
router.put('/', updateCustomer);
router.get('/:_id', getCurrentCustomer);
router.delete('/:_id', deleteCustomer);

module.exports = router;

function createCustomer(req, res) {
    customerService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function listCustomer(req, res) {

        customerService.listCustomer()
            .then(function (customer) {
                if (customer) {
                    res.send(customer);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(function (err) {
                res.status(400).send(err);
            });
}

function getCurrentCustomer(req, res) {
    var customerId = req.params._id;
    customerService.getById(customerId)
        .then(function (customer) {
            if (customer) {
                res.send(customer);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateCustomer(req, res) {
    customerService.update(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteCustomer(req, res) {
    var customerId = req.params._id;
    customerService.delete(customerId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}