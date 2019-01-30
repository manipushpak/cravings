import express from 'express';
let router = express.Router();
import Vendor from '../models/vendor';
import VendorLocation from '../models/location';
import DataManager from '../data/datamanager';
/* GET home page. */
var dm = new DataManager();

router.get('/vendors', (req, res, next ) => {
    let vendors = dm.getVendors();
    res.json(vendors);
});

router.post('/vendor/create', (req, res) => {
   let vendor = new Vendor(req.body.name, 
   req.body.location, req.body.keywords, req.body.phone);
   dm.createVendor(vendor);
   res.json(vendor);
})

export default router;