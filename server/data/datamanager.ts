import Vendor from "../models/vendor";

//import {SampleDB }from '../data/sampledb.json';
var filepath = "server/data/sampledb.json";
export default class DataManager {

    constructor(){}

    createVendor(vendor:Vendor){
        var fs = require('fs')

        fs.readFile(filepath, 'utf-8', function(err:any, data:any) {
            if (err) throw err
        
            var arrayOfObjects = JSON.parse(data)
            arrayOfObjects.vendors.push(        {
                "name": vendor.getName() || null,
                "location": {
                    "address": vendor.getLocation().getAddress() || null,
                    "coordinates": vendor.getLocation().getCoordinates() || null
                },
                "keywords": vendor.getKeywords() || null,
                "phone": vendor.getPhone() || null
            })
        

            fs.writeFile(filepath, JSON.stringify(arrayOfObjects), 'utf-8', function(err:any) {
                if (err) throw err
                console.log('Done!')
            })
        })
    }

    getVendors(){
  //return SampleDB.vendors;
  return null;
    }
  }