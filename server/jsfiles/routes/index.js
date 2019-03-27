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
var bson_1 = require("bson");
// import IUser from '../data/mongomanagers/usermanager';
// import IVendor from '../data/mongomanagers/vendormanager';
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://devikaku:Capstone%402019@cluster0-7syxc.mongodb.net/test?retryWrites=true";
var client = new MongoClient(uri, { useNewUrlParser: true });
var database;
var vendorDB;
var keywordDB;
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
        keywordDB = database.collection("Keywords");
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
router.get('/keywords', function (req, res, next) {
    keywordDB.find({}).toArray(function (err, documents) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(documents);
        }
    });
});
router.get('/keywords/random', function (req, res, next) {
    keywordDB.find({}).toArray(function (err, documents) {
        if (err) {
            res.send(err);
        }
        else {
            var num = Math.floor(Math.random() * documents.length);
            res.send(documents[num].keyword);
        }
    });
});
router.post('/vendor/register', function (req, res) {
    var rvendor = req.body.vendor;
    var success = false;
    try {
        vendorDB.findOneAndReplace({
            loginInfo: rvendor.loginInfo
        }, {
            loginInfo: rvendor.loginInfo,
            vendorInfo: rvendor.vendorInfo
        }, { returnNewDocument: true }, function (err, res2) {
            var vendor = res2.value;
            if (err) {
                res.send({ success: false, error: err.toString() });
            }
            else if (res2 == null || res2.value == null) {
                res.send({ success: false, error: res2 });
            }
            else {
                var arr = [];
                for (var key in vendor.vendorInfo.keywords) {
                    var obj = {
                        keyword: vendor.vendorInfo.keywords[key]
                    };
                    arr.push(obj);
                }
                console.log(arr);
                if (arr.length == 0) {
                    res.send({ success: true, vendor: vendor, keywords: false });
                }
                else {
                    keywordDB.insertMany(arr, function (err, ress) {
                        if (err) {
                            console.log({ success: false, error: err });
                        }
                        else {
                            res.send({ success: true, vendor: vendor, keywords: true });
                        }
                    });
                }
            }
        });
    }
    catch (e) {
        res.send({
            success: false,
            error: e.toString()
        });
    }
});
router.post('/vendor/filter', function (req, res) {
    var vendors = req.body.vendors;
    var filters = req.body.filters;
    if (filters == null || filters.length == 0) {
        res.send({ success: true, vendors: vendors, error: "No filters" });
    }
    else {
        var filterlist_1 = new Set();
        for (var k in filters) {
            filterlist_1.add(filters[k].toLowerCase());
        }
        var filtered = vendors.filter(function (v) {
            if (!(v.vendorInfo == null || v.vendorInfo.flags == null || v.vendorInfo.flags.length == 0)) {
                for (var f in v.vendorInfo.flags) {
                    if (filterlist_1.has(v.vendorInfo.flags[f].toLowerCase())) {
                        return v;
                    }
                }
            }
        });
    }
});
router.post('/vendor/modify', function (req, res) {
    var vendor = req.body.vendor;
    var success = false;
    try {
        vendorDB.findOneAndReplace({
            loginInfo: vendor.loginInfo
        }, {
            loginInfo: vendor.loginInfo,
            vendorInfo: vendor.vendorInfo
        }, { returnNewDocument: true }, function (err, res2) {
            res.send(res2.value);
        });
    }
    catch (e) {
        res.send({
            success: false,
            error: e.toString()
        });
    }
});
router.get('/search/:term', function (req, res) {
    var term = req.params.term;
    vendorDB.find({}).toArray(function (err, vendors) {
        var all = vendors;
        if (err) {
            res.json({ success: false, error: err.toString() });
        }
        else if (all == null || all.length == 0) {
            res.json({ success: false, error: "Error: no vendors" });
        }
        else {
            var results = [];
            for (var v in all) {
                var current = all[v];
                if (current == null) {
                    continue;
                }
                var currentVInfo = current.vendorInfo;
                if (currentVInfo == null) {
                    continue;
                }
                var names = currentVInfo.vendorName;
                var stallName = currentVInfo.stallName;
                var address = null;
                if (currentVInfo.address != null) {
                    address = currentVInfo.address.address;
                }
                var keywords = currentVInfo.keywords;
                var include = false;
                //names
                if (names != null && names.length > 0) {
                    for (var k in names) {
                        var first = names[k].firstName.toLowerCase();
                        var last = names[k].lastName.toLowerCase();
                        var whole = first + " " + last;
                        if (first.includes(term) || last.includes(term) || whole.includes(term)) {
                            include = true;
                        }
                    }
                }
                //stallname
                if (!include) {
                    if (stallName != null && stallName != "") {
                        if (stallName.toLowerCase().includes(term)) {
                            include = true;
                        }
                    }
                }
                //address
                if (!include) {
                    if (address != null && address != "") {
                        if (address.toLowerCase().includes(term)) {
                            include = true;
                        }
                    }
                }
                //keywords
                if (!include) {
                    if (keywords != null && keywords.length > 0) {
                        for (var z in keywords) {
                            if (keywords[z].toLowerCase().includes(term)) {
                                include = true;
                            }
                        }
                    }
                }
                if (include) {
                    results.push(current);
                }
            }
            res.json({ success: true, vendors: results });
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
router.post('/vendor/signup', function (req, res) {
    var verification = {
        email: req.body.email,
        hash: req.body.password
    };
    if (verification.email == null || verification.email == undefined || verification.email == ""
        || verification.hash == null || verification.hash == undefined || verification.hash == "") {
        res.json({ success: false, error: "Email or hash empty" });
    }
    else {
        vendorDB.find({}).toArray(function (err, documents) {
            var found = false;
            for (var v in documents) {
                var obj = documents[v];
                if (documents[v].loginInfo.email == verification.email) {
                    found = true;
                }
            }
            if (found) {
                res.send({
                    success: false,
                    error: "email already exists"
                });
            }
            else {
                var newVendor_1 = {
                    loginInfo: {
                        email: verification.email,
                        password: verification.hash
                    },
                    vendorInfo: {
                        vendorName: [],
                        stallName: "",
                        phone: "",
                        address: {
                            address: "",
                            coordinates: {
                                lat: 0,
                                lng: 0
                            }
                        },
                        keywords: [],
                        flags: [],
                        hours: []
                    }
                };
                vendorDB.insertOne(newVendor_1, function (err, res2) {
                    if (err) {
                        res.send({
                            success: false,
                            error: err
                        });
                    }
                    else {
                        res.send({
                            success: true,
                            vendor: newVendor_1
                        });
                    }
                });
            }
        });
    }
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
        loginInfo: {
            email: verification.email,
            password: verification.hash
        }
    }, function (err, vendor) {
        if (err) {
            res.json({ success: false, error: err });
        }
        else {
            {
                if (vendor) {
                    res.json({ success: true, vendor: vendor });
                }
                else {
                    res.json({ success: false });
                }
            }
        }
    });
});
router.get('/initvendors', function (req, res) {
    vendorDB.insertMany(sampledb_1.default, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("success");
        }
    });
});
router.get('/initkeywords', function (req, res) {
    var keywords = [
        {
            keyword: "taco"
        },
        {
            keyword: "ramen"
        },
        {
            keyword: "usc"
        },
        {
            keyword: "lemonade"
        },
        {
            keyword: "noods"
        }
    ];
    keywordDB.insertMany(keywords, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("success");
        }
    });
});
router.get('/test', function (req, res) {
    var verification = {
        email: "dededed@usc.edu",
        hash: "fsdfs"
    };
    if (verification.email == null || verification.email == undefined || verification.email == ""
        || verification.hash == null || verification.hash == undefined || verification.hash == "") {
        res.json({ success: false, error: "Email or hash empty" });
    }
    else {
        vendorDB.find({}).toArray(function (err, documents) {
            var found = false;
            for (var v in documents) {
                var obj = documents[v];
                if (documents[v].loginInfo.email == verification.email) {
                    found = true;
                }
            }
            if (found) {
                res.send({
                    success: false,
                    error: "email already exists"
                });
            }
            else {
                var newVendor = {
                    loginInfo: {
                        email: verification.email,
                        password: verification.hash
                    },
                    vendorInfo: {
                        vendorName: [],
                        stallName: "",
                        phone: "",
                        address: {
                            address: "",
                            coordinates: {
                                lat: 0,
                                lng: 0
                            }
                        },
                        keywords: [],
                        flags: [],
                        hours: []
                    }
                };
                vendorDB.insertOne(newVendor, function (err, res2) {
                    if (err) {
                        res.send({
                            success: false,
                            error: err
                        });
                    }
                    else {
                        res.send({
                            success: true,
                            vendor: res2
                        });
                    }
                });
            }
        });
    }
});
exports.default = router;
