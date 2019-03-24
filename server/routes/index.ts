import * as express from 'express';
let router = express.Router();
// import DataManager from '../data/datamanager';
import { Vendor, User } from '../models/types';
import vendors from '../data/sampledb';
import users from '../data/sampledbusers';
import { ObjectId } from 'bson';
// import IUser from '../data/mongomanagers/usermanager';
// import IVendor from '../data/mongomanagers/vendormanager';
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://devikaku:Capstone%402019@cluster0-7syxc.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
var database:any;
var vendorDB:any;
var userDB:any;
// client.connect((err:any) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



        // attempt to get database connection
        client.connect((err:any,client:any)=>{
            // unable to get database connection pass error to CB
            if(err)
                console.log("HELLO" + err);
            // Successfully got our database connection
            // Set database connection and call CB
            else{
                console.log("successfully connnected!");
                database = client.db("401Capstone");
                vendorDB = database.collection("Vendors");
                userDB = database.collection("Users");
                console.log("connected to test");
            }
        });


router.get('/vendors', (req, res, next) => { //DONE
    vendorDB.find({}).toArray((err: any, documents: any)=> {
        if (err){ 
            res.send(err)
        }else{
            res.send(documents);
        }
    });
});

router.post('/vendor/create', (req, res) => { //DONE
    let vendor: Vendor =
    {
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
    }, (err: any, vendor: any) => {
        if (err) {
            res.json({ success: false, error: err });
        } else {
            if (vendor) {
                res.json({ success: false });
            } else {
                vendorDB.insertOne(vendor, function (error:any, response:any) {
                    if(error) {
                        res.json({ success: false , error: error});
                       // return 
                    } else {
                        res.json({ success: true });
                    }
                });
            }
        }
    });


});

router.get('/vendor/:filter/:term', (req, res) => { //DONE
    let filter: string = req.params.filter;
    let term: string = req.params.term;
    vendorDB.find().toArray((err: any, vendors: any) => {
        if (err) {
            res.json("Error");
        } else {

            let all: Vendor[] = vendors;
            if (filter.trim() === "name") {
                res.json(all.filter(v => v.stallName.trim().toLowerCase().indexOf(term.trim().toLowerCase()) > -1));
            } else if (filter.trim() === "keywords") {
                let filtered: Vendor[] = [];

                for (let i = 0; i < all.length; i++) {
                    let v: Vendor = all[i];
                    let add: boolean = false;
                    if (v != undefined && v != null) {
                        for (let j = 0; j < v.keywords.length; j++) {
                            let k: string = v.keywords[j];
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
            } else {
                res.json([]);
            }
        }
    });
});

router.get('/vendorId/:id', (req, res, next) => { //DONE
    vendorDB.findOne({_id: new ObjectId(req.params.id)}, (err: any, vendor: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(vendor);
        }
    });
});

router.get('/vendorEmail/:email', (req, res, next) => { //DONE
    vendorDB.findOne({
        email: req.params.email
    }, (err: any, vendor: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(vendor);
        }
    })
});

router.post('/vendor/authenticate', (req, res) => { //DONE
    let verification: any =
    {
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
    }, (err: any, vendor: any) => {
        if (err) {
            res.json({ success: false, error: err });
        } else {
            {
                if (vendor) {
                    res.json({ success: true });
                } else {
                    res.json({ success: false });
                }
            }
        }
    })

});

router.get('/users', (req, res, next) => { //DONE
    userDB.find({}).toArray((err: any, documents: any)=> {
        if (err){ 
            res.send(err)
        }else{
            res.send(documents);
        }
    });
});

router.get('/user/:id', (req, res, next) => { //DONE
    userDB.findOne({_id: new ObjectId(req.params.id)}, (err: any, vendor: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(vendor);
        }
    });
});

router.post('/user/create', (req, res) => { //DONE
    let user: User =
    {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    };

    userDB.findOne({
        email: user.email
    }, (err: any, u: any) => {
        if (err) {
            res.json({ success: false, error: err });
        } else {
            if (u) {
                res.json({ success: false });
            } else {
                userDB.insertOne(user, function (error:any, response:any) {
                    if(error) {
                        res.json({ success: false , error: error});
                       // return 
                    } else {
                        res.json({ success: true });
                    }
                });
            }
        }
    });
});

router.post('/user/login', (req, res) => { //DONE
    let verification: any =
    {
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
    }, (err: any, user: any) => {
        if (err) {
            res.json({ success: false, error: err });
        } else {
            {
                if (user) {
                    res.json({ success: true });
                } else {
                    res.json({ success: false });
                }
            }
        }
    })
});


router.get('/initusers', (req, res) => { //DONE

    userDB.insertMany(users, (err: any) => {
        if (err) {
            res.send(err)
        } else {
            res.send("success");
        }
    });

});

router.get('/initvendors', (req, res) => { //DONE

    database.collection("Vendors").insertMany(vendors, (err: any) => {
        if (err) {
            res.send(err)
        } else {
            res.send("success");
        }
    });
});

router.get('/test', (req, res) => {

    let user: User =
    {
        name: "rahil",
        email: "rahil97@usc.edu",
        password: "fgdfgdfgd",
        phone: "dfgdgdfg"
    };

    userDB.findOne({
        email: user.email
    }, (err: any, u: any) => {
        if (err) {
            res.json({ success: false, error: err });
        } else {
            if (u) {
                res.json({ success: false });
            } else {
                userDB.insertOne(user, function (error:any, response:any) {
                    if(error) {
                        res.json({ success: false , error: error});
                       // return 
                    } else {
                        res.json({ success: true });
                    }
                });
            }
        }
    });

});

export default router;