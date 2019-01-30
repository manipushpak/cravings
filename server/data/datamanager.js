import SampleDB from '../data/sampledb';
var filepath = "server/data/sampledb.json";
export default class DataManager {

    constructor(){}

    createVendor(vendor){
        var fs = require('fs')

        fs.readFile(filepath, 'utf-8', function(err, data) {
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
        

            fs.writeFile(filepath, JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                if (err) throw err
                console.log('Done!')
            })
        })
    }

    getVendors(){
    return SampleDB.vendors;

    }
  }