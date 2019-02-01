"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VendorLocation = /** @class */ (function () {
    function VendorLocation(address, coordinates) {
        this.address = address;
        this.coordinates = coordinates;
    }
    VendorLocation.prototype.getAddress = function () {
        return this.address;
    };
    VendorLocation.prototype.getCoordinates = function () {
        return this.coordinates;
    };
    return VendorLocation;
}());
exports.default = VendorLocation;
