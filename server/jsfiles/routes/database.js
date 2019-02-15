"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    Database.prototype.testing = function () {
        var userKey = datastore.key('user');
        var user = {
            'name': "david",
        };
        var entity = {
            key: userKey,
            data: user,
        };
        datastore.insert(entity);
    };
    return Database;
}());
exports.default = Database;
