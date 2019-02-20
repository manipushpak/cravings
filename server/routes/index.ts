import * as express from 'express';
let router = express.Router();
// import DataManager from '../data/datamanager';
import { Vendor, User } from '../models/types';
import vendors from '../data/sampledb';
import users from '../data/sampledbusers';
import IUser from '../data/mongomanagers/usermanager';
import IVendor from '../data/mongomanagers/vendormanager';
import mongoose = require('mongoose');
const uri: string = 'mongodb://127.0.0.1:27017/Cravings';
/* GET home page. */
// var dm = new DataManager();

//retrieve vendor by email
//validate vendor
//
mongoose.connect(uri, { useNewUrlParser: true }, (err: any) => {
    if (err) {
      console.log("ERROR");
      console.log(err.message);
    } else {
      console.log("Succesfully Connected!");
    }
  });


router.get('/vendors', (req, res, next) => {
    IVendor.find((err: any, vendors: any) => {
        if (err) {
          res.json("Error");
        } else {
          res.json(vendors);
        }
      })
});

router.post('/vendor/create', (req, res) => {
   let vendor:Vendor = 
   {email:req.body.email,
    password:req.body.password,
    stallName:req.body.stallName,
    vendorName:req.body.vendorName,
   location: req.body.location,
   keywords: req.body.keywords,
   week: req.body.week,
   hours: req.body.hours,
   phone: req.body.phone,
   open: req.body.open};

   var saveVendor = new IVendor(vendor);

   saveVendor.save((err: any) => {
     if (err) {
       res.json(err);
     } else {
       console.log(saveVendor);
       res.json(saveVendor);
     }
   });

});

router.get('/vendor/:filter/:term', (req, res) => {
    let filter:string = req.params.filter;
    let term:string = req.params.term;
    IVendor.find((err: any, vendors: any) => {
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

router.get('/users', (req, res, next) => {
    IUser.find((err: any, users: any) => {
        if (err) {
          res.json("Error");
        } else {
          res.json(users);
        }
      })
});

router.get('/user/:id', (req, res, next) => {
    IUser.findById(req.params.id, (err: any, user: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send(user);
        }
      });
});

router.get('/vendorId/:id', (req, res, next) => {
    IVendor.findById(req.params.id, (err: any, vendor: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send(vendor);
        }
      });
});

router.get('/vendorEmail/:email', (req, res, next) => {
    IVendor.findOne({
        email: req.params.email
    }, (err: any, vendor: any) => {
        if (err) {
          res.json(err);
        } else {
          res.json(vendor);
        }
      })
});

router.post('/vendor/authenticate', (req, res) => {
    let verification:any = 
    {email: req.body.email,
    hash: req.body.password};

 
    if (verification.email == null || verification.email == undefined || verification.email == ""
      || verification.hash == null || verification.hash == undefined || verification.hash == "") {
      res.json({ success: false });
    }

    IVendor.findOne({
        email: verification.email,
        password: verification.hash
    }, (err: any, vendor: any) => {
        if (err) {
          res.json({ success: false, error: err});
        } else {
          res.json({ success: true });
        }
      })

 });

router.post('/user/create', (req, res) => {
   let user:User = 
   {name: req.body.name, 
   email: req.body.email,
   password: req.body.password,
   phone: req.body.phone};

   var saveUser = new IUser(user);

   saveUser.save((err: any) => {
     if (err) {
       res.json(err);
     } else {
       res.json(saveUser);
     }
   });
});

router.post('/user/login', (req, res) => {
    let verification:any = 
    {email: req.body.email,
    hash: req.body.password};

 
    if (verification.email == null || verification.email == undefined || verification.email == ""
      || verification.hash == null || verification.hash == undefined || verification.hash == "") {
      res.json({ success: false });
    }

    IUser.findOne({
        email: verification.email,
        password: verification.hash
    }, (err: any, user: any) => {
        if (err) {
          res.json({ success: false, error: err});
        } else {
          res.json({ success: true });
        }
      })
 });


router.get('/initusers', (req, res) => {

  IUser.insertMany(users, (err: any) => {
    if (err) {
      res.send(err)
    } else {
      res.send("success");
    }
  });

 });

 router.get('/initvendors', (req, res) => {
  
    IVendor.insertMany(vendors, (err: any) => {
      if (err) {
        res.send(err)
      } else {
        res.send("success");
      }
    });
   });

  router.get('/test', (req, res) => {
   });

export default router;