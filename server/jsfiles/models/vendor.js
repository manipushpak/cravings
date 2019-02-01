"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vendor = /** @class */ (function () {
    function Vendor(name, location, keywords, phone) {
        this.name = name;
        this.location = location;
        this.keywords = keywords;
        this.phone = phone;
    }
    Vendor.prototype.getName = function () {
        return this.name;
    };
    Vendor.prototype.getLocation = function () {
        return this.location;
    };
    Vendor.prototype.getKeywords = function () {
        return this.keywords;
    };
    Vendor.prototype.getPhone = function () {
        return this.phone;
    };
    return Vendor;
}());
exports.default = Vendor;
