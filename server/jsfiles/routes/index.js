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
var datamanager_1 = __importDefault(require("../data/datamanager"));
/* GET home page. */
var dm = new datamanager_1.default();
router.get('/vendors', function (req, res, next) {
    var vendors = dm.getVendors();
    res.json(vendors);
});
router.post('/vendor/create', function (req, res) {
    var vendor = { name: req.body.name,
        location: req.body.location,
        keywords: req.body.keywords,
        phone: req.body.phone };
    dm.createVendor(vendor);
    res.json(vendor);
});
// router.get('/testing', (req, res) => {
//     let testing:string = "hello!";
//     let vendor:Vendor = {
//         name: "sonali",
//         location: {
//             address: "phi sig",
//             coordinates: [23, 44]
//         },
//         phone: "650"
//     }
//     dm.createVendor(vendor);
//     res.json(dm.getVendors());
//  })
exports.default = router;
