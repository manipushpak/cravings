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
var bson_1 = require("bson");
// import IUser from '../data/mongomanagers/usermanager';
// import IVendor from '../data/mongomanagers/vendormanager';
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://devikaku:Capstone%402019@cluster0-7syxc.mongodb.net/test?retryWrites=true";
var client = new MongoClient(uri, { useNewUrlParser: true });
var database;
var vendorDB;
var userDB;
// client.connect((err:any) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// attempt to get database connection
client.connect(function (err, client) {
    // unable to get database connection pass error to CB
    if (err)
        console.log("HELLO" + err);
    // Successfully got our database connection
    // Set database connection and call CB
    else {
        console.log("successfully connnected!");
        database = client.db("401Capstone");
        vendorDB = database.collection("Vendors");
        userDB = database.collection("Users");
        console.log("connected to test");
    }
});
router.get('/vendors', function (req, res, next) {
    vendorDB.find({}).toArray(function (err, documents) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(documents);
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
    vendorDB.findOne({
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
                vendorDB.insertOne(vendor, function (error, response) {
                    if (error) {
                        res.json({ success: false, error: error });
                        // return 
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
    vendorDB.find().toArray(function (err, vendors) {
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
    vendorDB.findOne({ _id: new bson_1.ObjectId(req.params.id) }, function (err, vendor) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(vendor);
        }
    });
});
router.get('/vendorEmail/:email', function (req, res, next) {
    vendorDB.findOne({
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
    vendorDB.findOne({
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
    userDB.find({}).toArray(function (err, documents) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(documents);
        }
    });
});
router.get('/user/:id', function (req, res, next) {
    userDB.findOne({ _id: new bson_1.ObjectId(req.params.id) }, function (err, vendor) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(vendor);
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
    userDB.findOne({
        email: user.email
    }, function (err, u) {
        if (err) {
            res.json({ success: false, error: err });
        }
        else {
            if (u) {
                res.json({ success: false });
            }
            else {
                userDB.insertOne(user, function (error, response) {
                    if (error) {
                        res.json({ success: false, error: error });
                        // return 
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
    userDB.findOne({
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
    userDB.insertMany(sampledbusers_1.default, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("success");
        }
    });
});
router.get('/initvendors', function (req, res) {
    database.collection("Vendors").insertMany(sampledb_1.default, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("success");
        }
    });
});
router.get('/test', function (req, res) {
    var user = {
        name: "rahil",
        email: "rahil97@usc.edu",
        password: "fgdfgdfgd",
        phone: "dfgdgdfg"
    };
    userDB.findOne({
        email: user.email
    }, function (err, u) {
        if (err) {
            res.json({ success: false, error: err });
        }
        else {
            if (u) {
                res.json({ success: false });
            }
            else {
                userDB.insertOne(user, function (error, response) {
                    if (error) {
                        res.json({ success: false, error: error });
                        // return 
                    }
                    else {
                        res.json({ success: true });
                    }
                });
            }
        }
    });
});
exports.default = router;
