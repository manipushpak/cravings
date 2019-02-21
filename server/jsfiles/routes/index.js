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
    var vendor = {
        email: req.body.email,
        password: req.body.password,
        stallName: req.body.stallName,
        vendorName: req.body.vendorName,
        location: req.body.location,
        keywords: req.body.keywords,
        week: req.body.week,
        hours: req.body.hours,
        phone: req.body.phone,
        open: req.body.open
    };
    var saveVendor = new vendormanager_1.default(vendor);
    vendormanager_1.default.findOne({
        email: vendor.email
    }, function (err, vendor) {
        if (err) {
            res.json({ success: false, error: err });
        }
        else {
            if (vendor) {
                res.json({ success: false });
            }
            else {
                saveVendor.save(function (err) {
                    if (err) {
                        res.json(err);
                    }
                    else {
                        res.json({ success: true });
                    }
                });
            }
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
router.get('/vendorId/:id', function (req, res, next) {
    vendormanager_1.default.findById(req.params.id, function (err, vendor) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(vendor);
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
    var verification = {
        email: req.body.email,
        hash: req.body.password
    };
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
            {
                if (vendor) {
                    res.json({ success: true });
                }
                else {
                    res.json({ success: false });
                }
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
            res.json(err);
        }
        else {
            res.json(user);
        }
    });
});
router.post('/user/create', function (req, res) {
    var user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    };
    var saveUser = new usermanager_1.default(user);
    usermanager_1.default.findOne({
        email: user.email
    }, function (err, user) {
        if (err) {
            res.json({ success: false, error: err });
        }
        else {
            if (user) {
                res.json({ success: false });
            }
            else {
                saveUser.save(function (err) {
                    if (err) {
                        res.json(err);
                    }
                    else {
                        res.json({ success: true });
                    }
                });
            }
        }
    });
});
router.post('/user/login', function (req, res) {
    var verification = {
        email: req.body.email,
        hash: req.body.password
    };
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
            {
                if (user) {
                    res.json({ success: true });
                }
                else {
                    res.json({ success: false });
                }
            }
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
    // let vendor: Vendor =
    // {
    //     stallName: "Taco Stand",
    //     email: "sonalai@usc.edu",
    //     vendorName: [
    //         "Sonali", "Pia"
    //     ],
    //     location: {
    //         address: "3770 S Fig",
    //         coordinates: {
    //             lat: 34.0254,
    //             lng: -118.2852
    //         }
    //     },
    //     password: "ilovecravings1",
    //     keywords: [
    //         "taco",
    //         "yummy"
    //     ],
    //     phone: "6508239461",
    //     open: true
    // };
    // var saveVendor = new IVendor(vendor);
    // IVendor.findOne({
    //     email: vendor.email
    // }, (err: any, vendor: any) => {
    //     if (err) {
    //         res.json({ success: false, error: err });
    //     } else {
    //         if (vendor) {
    //             res.json({ success: false });
    //         } else {
    //             saveVendor.save((err: any) => {
    //                 if (err) {
    //                     res.json(err);
    //                 } else {
    //                     res.json({ success: true });
    //                 }
    //             });
    //         }
    //     }
    // });
});
exports.default = router;
