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
var sampledb_1 = __importDefault(require("../data/sampledb"));
var sampledbusers_1 = __importDefault(require("../data/sampledbusers"));
var usermanager_1 = __importDefault(require("../data/mongomanagers/usermanager"));
var vendormanager_1 = __importDefault(require("../data/mongomanagers/vendormanager"));
var mongoose = require("mongoose");
var uri = 'mongodb://127.0.0.1:27017/Cravings';
/* GET home page. */
// var dm = new DataManager();
//retrieve vendor by email
//validate vendor
//
mongoose.connect(uri, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log("ERROR");
        console.log(err.message);
    }
    else {
        console.log("Succesfully Connected!");
    }
});
router.get('/vendors', function (req, res, next) {
    vendormanager_1.default.find(function (err, vendors) {
        if (err) {
            res.json("Error");
        }
        else {
            res.json(vendors);
        }
    });
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
    var saveVendor = new vendormanager_1.default(vendor);
    saveVendor.save(function (err) {
        if (err) {
            res.json(err);
        }
        else {
            console.log(saveVendor);
            res.json(saveVendor);
        }
    });
});
router.get('/vendor/:filter/:term', function (req, res) {
    var filter = req.params.filter;
    var term = req.params.term;
    vendormanager_1.default.find(function (err, vendors) {
        if (err) {
            res.json("Error");
        }
        else {
            var all = vendors;
            if (filter.trim() === "name") {
                res.json(all.filter(function (v) { return v.stallName.trim().toLowerCase().indexOf(term.trim().toLowerCase()) > -1; }));
            }
            else if (filter.trim() === "keywords") {
                var filtered = [];
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
                res.json(filtered);
            }
            else {
                res.json([]);
            }
        }
    });
});
router.get('/users', function (req, res, next) {
    usermanager_1.default.find(function (err, users) {
        if (err) {
            res.json("Error");
        }
        else {
            res.json(users);
        }
    });
});
router.get('/user/:id', function (req, res, next) {
    usermanager_1.default.findById(req.params.id, function (err, user) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(user);
        }
    });
});
router.get('/vendorId/:id', function (req, res, next) {
    vendormanager_1.default.findById(req.params.id, function (err, vendor) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(vendor);
        }
    });
});
router.get('/vendorEmail/:email', function (req, res, next) {
    vendormanager_1.default.findOne({
        email: req.params.email
    }, function (err, vendor) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(vendor);
        }
    });
});
router.post('/vendor/authenticate', function (req, res) {
    var verification = { email: req.body.email,
        hash: req.body.password };
    if (verification.email == null || verification.email == undefined || verification.email == ""
        || verification.hash == null || verification.hash == undefined || verification.hash == "") {
        res.json({ success: false });
    }
    vendormanager_1.default.findOne({
        email: verification.email,
        password: verification.hash
    }, function (err, vendor) {
        if (err) {
            res.json({ success: false, error: err });
        }
        else {
            res.json({ success: true });
        }
    });
});
router.post('/user/create', function (req, res) {
    var user = { name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone };
    var saveUser = new usermanager_1.default(user);
    saveUser.save(function (err) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(saveUser);
        }
    });
});
router.post('/user/login', function (req, res) {
    var verification = { email: req.body.email,
        hash: req.body.password };
    if (verification.email == null || verification.email == undefined || verification.email == ""
        || verification.hash == null || verification.hash == undefined || verification.hash == "") {
        res.json({ success: false });
    }
    usermanager_1.default.findOne({
        email: verification.email,
        password: verification.hash
    }, function (err, user) {
        if (err) {
            res.json({ success: false, error: err });
        }
        else {
            res.json({ success: true });
        }
    });
});
router.get('/initusers', function (req, res) {
    usermanager_1.default.insertMany(sampledbusers_1.default, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("success");
        }
    });
});
router.get('/initvendors', function (req, res) {
    vendormanager_1.default.insertMany(sampledb_1.default, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("success");
        }
    });
});
router.get('/test', function (req, res) {
});
exports.default = router;
