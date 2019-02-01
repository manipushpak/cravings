import * as express from 'express';
let router = express.Router();
import DataManager from '../data/datamanager';
import { Vendor } from '../models/types';
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

export default router;