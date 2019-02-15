"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var extName = require('ext-name');
var urlUtil = require('url');
var path = require('path');
var fs = require('fs');
var fetch = require('node-fetch');
var config = require('../config');
var Datastore = require('@google-cloud/datastore');
var datastore = new Datastore({});
var request = require('request');
var Storage = require('@google-cloud/storage').Storage;
var storage = new Storage({});
var NODE_ENV = process.env.NODE_ENV;
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.handleIncomingSMS = function () {
        //const { body } = req;
        var userKey = datastore.key('user');
        var user = {
            'name': "david",
        };
        var entity = {
            key: userKey,
            data: user,
        };
        datastore.insert(entity);
        //return res.send(response.toString()).status(200);
    };
    return Database;
}());
exports.default = Database;
//   /**
//    * Initialize router and define routes.
// */
// const router = express.Router();
// //router.post('/incoming', handleIncomingSMS);
// router.get('/tester', (req, res) => {
//   return handleIncomingSMS(req, res);
// });
//router.get('/images', fetchRecentImages);
// return router;
// module.exports = {
//   MessagingRouter,
// };
