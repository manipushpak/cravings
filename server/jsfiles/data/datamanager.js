"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sampledb_1 = __importDefault(require("./sampledb"));
var DataManager = /** @class */ (function () {
    function DataManager() {
    }
    DataManager.prototype.createVendor = function (vendor) {
        sampledb_1.default.push(vendor);
    };
    DataManager.prototype.getVendors = function () {
        return sampledb_1.default;
    };
    return DataManager;
}());
exports.default = DataManager;
