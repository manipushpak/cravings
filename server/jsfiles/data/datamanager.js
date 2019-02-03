"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sampledb_1 = __importDefault(require("./sampledb"));
var sampledbusers_1 = __importDefault(require("./sampledbusers"));
var DataManager = /** @class */ (function () {
    function DataManager() {
    }
    DataManager.prototype.createVendor = function (vendor) {
        //testing purposes:
        vendor._id = Math.floor(Math.random() * (1000 - 10) + 10).toString();
        sampledb_1.default.push(vendor);
    };
    DataManager.prototype.getVendors = function () {
        return sampledb_1.default;
    };
    DataManager.prototype.getVendorSearch = function (filter, term) {
        //talk about filtering by address bc a little more complicated
        if (filter.trim() === "name") {
            return this.getVendors().filter(function (v) { return v.name.trim().toLowerCase().indexOf(term.trim().toLowerCase()) > -1; });
        }
        else if (filter.trim() === "keywords") {
            var filtered = [];
            var all = this.getVendors();
            for (var i = 0; i < all.length; i++) {
                var v = all[i];
                var add = false;
                if (v != undefined && v != null) {
                    for (var j = 0; j < v.keywords.length; j++) {
                        var k = v.keywords[j];
                        if (k.trim().toLowerCase() === term.trim().toLowerCase()) {
                            add = true;
                        }
                    }
                }
                if (add) {
                    filtered.push(v);
                }
            }
            return filtered;
        }
        else {
            return [];
        }
    };
    DataManager.prototype.getVendor = function (id) {
        var res = sampledb_1.default.filter(function (v) { return v._id === id; });
        if (res == null || res == undefined || res.length == 0) {
            return null;
        }
        return res[0];
    };
    DataManager.prototype.createUser = function (user) {
        //testing purposes:
        user._id = Math.floor(Math.random() * (1000 - 10) + 10).toString();
        sampledbusers_1.default.push(user);
    };
    DataManager.prototype.getUsers = function () {
        return sampledbusers_1.default;
    };
    DataManager.prototype.getUser = function (id) {
        var res = sampledbusers_1.default.filter(function (v) { return v._id === id; });
        if (res == null || res == undefined || res.length == 0) {
            return null;
        }
        return res[0];
    };
    return DataManager;
}());
exports.default = DataManager;
