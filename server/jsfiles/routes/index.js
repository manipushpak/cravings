"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var router = express.Router();
var vendor_1 = __importDefault(require("../models/vendor"));
var datamanager_1 = __importDefault(require("../data/datamanager"));
/* GET home page. */
var dm = new datamanager_1.default();
router.get('/vendors', function (req, res, next) {
    var vendors = dm.getVendors();
    res.json(vendors);
});
router.post('/vendor/create', function (req, res) {
    var vendor = new vendor_1.default(req.body.name, req.body.location, req.body.keywords, req.body.phone);
    dm.createVendor(vendor);
    res.json(vendor);
});
router.get('/testing', function (req, res) {
    var testing = "hello!";
    res.json(testing);
});
exports.default = router;
