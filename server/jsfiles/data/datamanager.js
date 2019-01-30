"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {SampleDB }from '../data/sampledb.json';
var filepath = "server/data/sampledb.json";
var DataManager = /** @class */ (function () {
    function DataManager() {
    }
    DataManager.prototype.createVendor = function (vendor) {
        var fs = require('fs');
        fs.readFile(filepath, 'utf-8', function (err, data) {
            if (err)
                throw err;
            var arrayOfObjects = JSON.parse(data);
            arrayOfObjects.vendors.push({
                "name": vendor.getName() || null,
                "location": {
                    "address": vendor.getLocation().getAddress() || null,
                    "coordinates": vendor.getLocation().getCoordinates() || null
                },
                "keywords": vendor.getKeywords() || null,
                "phone": vendor.getPhone() || null
            });
            fs.writeFile(filepath, JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                if (err)
                    throw err;
                console.log('Done!');
            });
        });
    };
    DataManager.prototype.getVendors = function () {
        //return SampleDB.vendors;
        return null;
    };
    return DataManager;
}());
exports.default = DataManager;
