import * as express from 'express';
let router = express.Router();
import DataManager from '../data/datamanager';
import { Vendor, User } from '../models/types';
import vendors from '../data/sampledb';
/* GET home page. */
var dm = new DataManager();

//retrieve vendor by email
//validate vendor
//

router.get('/vendors', (req, res, next) => {
    let vendors:Vendor[] = dm.getVendors();
    res.json(vendors);
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

   dm.createVendor(vendor);
   res.json(vendor);
});

router.get('/vendor/:filter/:term', (req, res) => {
    let vendors:Vendor[] = dm.getVendorSearch(req.params.filter, req.params.term);
    res.json(vendors);
 }); 

router.get('/users', (req, res, next) => {
    let users:User[] = dm.getUsers();
    res.json(users);
});

router.get('/user/:id', (req, res, next) => {
    let user:any = dm.getUser(req.params.id);
    res.json(user);
});

router.get('/vendorId/:id', (req, res, next) => {
    let vendor:any = dm.getVendorById(req.params.id);
    res.json(vendor);
});

router.get('/vendorEmail/:email', (req, res, next) => {
    let vendor:any = dm.getVendorByEmail(req.params.email);
    res.json(vendor); 
});

router.post('/vendor/authenticate', (req, res) => {
    let verification:any = 
    {email: req.body.email,
    hash: req.body.password};
 
    let auth:any = dm.authenticateVendor(verification);
    res.json(auth);
 });

router.post('/user/create', (req, res) => {
   let user:User = 
   {name: req.body.name, 
   email: req.body.email,
   password: req.body.password,
   phone: req.body.phone};

   let auth:any = dm.createUser(user);
   res.json(auth);
});

router.post('/user/login', (req, res) => {
    let verification:any = 
    {email: req.body.email,
    hash: req.body.password};
 
    let auth:any = dm.authenticateUser(verification);
    res.json(auth);
 });


router.get('/testing', (req, res) => {
    // let searchres:any = dm.getVendor("2");
    // let vendor:User= {
    //     name: "sonali",
    //     email: "sonalipa@usc.edu",
    //     username: "sonalipa",
    //     password: "squirttheturt"
    // }
    // dm.createUser(vendor);
    //res.json(searchres);
 })

export default router;