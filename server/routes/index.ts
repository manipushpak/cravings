import * as express from 'express';
let router = express.Router();
import DataManager from '../data/datamanager';
import { Vendor, User } from '../models/types';
import vendors from '../data/sampledb';
/* GET home page. */
var dm = new DataManager();

router.get('/vendors', (req, res, next) => {
    let vendors:Vendor[] = dm.getVendors();
    res.json(vendors);
});

router.post('/vendor/create', (req, res) => {
   let vendor:Vendor = 
   {name: req.body.name, 
   location: req.body.location,
   keywords: req.body.keywords,
   phone: req.body.phone};

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

router.get('/vendor/:id', (req, res, next) => {
    let vendor:any = dm.getVendor(req.params.id);
    res.json(vendor);
});

router.post('/user/create', (req, res) => {
   let user:User = 
   {name: req.body.name, 
   email: req.body.email,
   username: req.body.username,
   password: req.body.password};

   dm.createUser(user);
   res.json(user);
});

router.get('/testing', (req, res) => {
    let searchres:any = dm.getVendor("2");
    // let vendor:User= {
    //     name: "sonali",
    //     email: "sonalipa@usc.edu",
    //     username: "sonalipa",
    //     password: "squirttheturt"
    // }
    // dm.createUser(vendor);
    res.json(searchres);
 })

export default router;