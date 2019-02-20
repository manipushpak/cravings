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
//retrieve vendor by email
//validate vendor
//
router.get('/vendors', function (req, res, next) {
    var vendors = dm.getVendors();
    res.json(vendors);
});
router.post('/vendor/create', function (req, res) {
    var vendor = { email: req.body.email,
        password: req.body.password,
        stallName: req.body.stallName,
        vendorName: req.body.vendorName,
        location: req.body.location,
        keywords: req.body.keywords,
        week: req.body.week,
        hours: req.body.hours,
        phone: req.body.phone,
        open: req.body.open };
    dm.createVendor(vendor);
    res.json(vendor);
});
router.get('/vendor/:filter/:term', function (req, res) {
    var vendors = dm.getVendorSearch(req.params.filter, req.params.term);
    res.json(vendors);
});
router.get('/users', function (req, res, next) {
    var users = dm.getUsers();
    res.json(users);
});
router.get('/user/:id', function (req, res, next) {
    var user = dm.getUser(req.params.id);
    res.json(user);
});
router.get('/vendorId/:id', function (req, res, next) {
    var vendor = dm.getVendorById(req.params.id);
    res.json(vendor);
});
router.get('/vendorEmail/:email', function (req, res, next) {
    var vendor = dm.getVendorByEmail(req.params.email);
    res.json(vendor);
});
router.post('/vendor/authenticate', function (req, res) {
    var verification = { email: req.body.email,
        hash: req.body.password };
    var auth = dm.authenticateVendor(verification);
    res.json(auth);
});
router.post('/user/create', function (req, res) {
    var user = { name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone };
    var auth = dm.createUser(user);
    res.json(auth);
});
router.post('/user/login', function (req, res) {
    var verification = { email: req.body.email,
        hash: req.body.password };
    var auth = dm.authenticateUser(verification);
    res.json(auth);
});
router.get('/testing', function (req, res) {
    // let searchres:any = dm.getVendor("2");
    // let vendor:User= {
    //     name: "sonali",
    //     email: "sonalipa@usc.edu",
    //     username: "sonalipa",
    //     password: "squirttheturt"
    // }
    // dm.createUser(vendor);
    //res.json(searchres);
});
exports.default = router;
