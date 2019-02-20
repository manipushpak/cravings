"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
;
exports.ITimeFrame = new mongoose.Schema({
    open: { type: Boolean, required: true },
    startTime: { type: Number, required: true },
    endTime: { type: Number, required: true },
});
exports.ILocationCoordinates = new mongoose.Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
});
exports.IVendorLocation = new mongoose.Schema({
    address: { type: String, required: true },
    coordinates: { type: exports.ILocationCoordinates, required: true },
});
exports.VendorSchema = new mongoose.Schema({
    stallName: { type: String, required: true },
    vendorName: [{ type: String, required: true }],
    email: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: exports.IVendorLocation, required: false },
    keywords: [{ type: String, required: true }],
    week: [{ type: String, required: false }],
    hours: [{ type: exports.ITimeFrame, required: false }],
    phone: { type: String, required: true },
    open: { type: Boolean, required: true },
});
var IVendor = mongoose.model('Vendor', exports.VendorSchema);
exports.default = IVendor;
