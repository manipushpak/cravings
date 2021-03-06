import * as express from 'express';
let router = express.Router();
// import DataManager from '../data/datamanager';
import { Vendor, User, VendorInfo } from '../models/types';
import vendorS from '../data/sampledb';
import { ObjectId } from 'bson';
import {TH} from '../helpers/timehelper';
// import IUser from '../data/mongomanagers/usermanager';
// import IVendor from '../data/mongomanagers/vendormanager';
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://devikaku:Capstone%402019@cluster0-7syxc.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
var database:any;
var vendorDB:any;
var keywordDB:any;


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
                keywordDB = database.collection("Keywords");
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

router.get('/keywords', (req, res, next) => { //DONE
    keywordDB.find({}).toArray((err: any, documents: any)=> {
        if (err){ 
            res.send(err)
        }else{
            res.send(documents);
        }
    });
});



router.get('/keywords/random', (req, res, next) => { //DONE
    keywordDB.find({}).toArray((err: any, documents: any)=> {
        if (err){ 
            res.send(err)
        }else{
            let num = Math.floor(Math.random()*documents.length);
            res.send(documents[num].keyword);
        }
    });
});

router.post('/vendor/register', (req, res) => { //DONE

    console.log("HEREEEEE");

    let rvendor: Vendor = req.body.vendor
    console.log(rvendor.vendorInfo.flags);
    let success:boolean = false;

    let openNowV:boolean = TH.isOpen(rvendor);
//DO OPEN LOGIC HERE

    try{

        vendorDB.findOneAndReplace(
            { 
                loginInfo : rvendor.loginInfo
            },
            {
                phone: rvendor.phone,
                openNow: openNowV,
                loginInfo: {
                    email: rvendor.loginInfo.email,
                    password: rvendor.loginInfo.password
                },
                vendorInfo: {
                    vendorName: rvendor.vendorInfo.vendorName,
                    stallName: rvendor.vendorInfo.stallName,
                    address: {
                        address: rvendor.vendorInfo.address.address,
                        coordinates: {
                            lat: rvendor.vendorInfo.address.coordinates.lat,
                            lng: rvendor.vendorInfo.address.coordinates.lng
                        }
                    },
                    keywords: rvendor.vendorInfo.keywords,
                    flags: rvendor.vendorInfo.flags,
                    hours: TH.getHours(rvendor.vendorInfo.hours)
                }
            },
            { returnNewDocument: true },
            (err:any, res2:any) =>{

                let vendor = res2.value;

                if(err){
                    res.send({success : false, error: err.toString()});
                }else if(res2 == null || res2.value == null){
                    res.send({success: false, error: res2});
                }
                else{
                    let arr:any[] = [];
                    for(let key in vendor.vendorInfo.keywords){
                        let obj = {
                        keyword: vendor.vendorInfo.keywords[key]
                        }
                        arr.push(obj);
                    }
                        console.log(arr);
                        if(arr.length == 0){
                        res.send({success: true, vendor: vendor, keywords: false});
                        }else{
                         keywordDB.insertMany(arr, (err: any, ress: any)=>{
                            if(err){
                                 console.log({success: false, error: err});
                            }else{
                                res.send({success: true, vendor: vendor, keywords: true});
                                }
                         });
    
                
                    }
                }

                                    
            });

    }catch(e){
        res.send({
            success: false,
            error: e.toString()
        });

    }

});



router.post('/vendor/filter', (req, res) => { //NOT USED


    let vendors: Vendor[] = req.body.vendors;
    let filters: string[] = req.body.filters;

    if(filters == null || filters.length == 0){
        res.send({success: true, vendors: vendors, error: "No filters"});
    }else{

        let filterlist:Set<string> = new Set<string>();
        for(let k in filters){
            filterlist.add(filters[k].toLowerCase());
        }

        let filtered:Vendor[] = vendors.filter(v => {
            
            if(!(v.vendorInfo == null || v.vendorInfo.flags == null || v.vendorInfo.flags.length == 0)){
                
                for(let f in v.vendorInfo.flags){
                    if(filterlist.has(v.vendorInfo.flags[f].toLowerCase())){
                        return v;
                    }
                }

            }
           
        });

        res.send(filtered);



    }

});


router.post('/vendor/filteredSearch', (req, res) => { //DONE
    let terms: string[] = req.body.terms;
    let filters: string[] = req.body.filters;
    let openSearch:boolean = req.body.open;
    vendorDB.find({}).toArray((err: any, vendors: any) => {
        let all: Vendor[] = vendors;
        if (err) {
            res.json({success: false, error: err.toString()});
        }
        else if(all == null || all.length == 0){
            res.json({success: false, error: "Error: no vendors"});
        }else if(terms == null || terms == undefined || terms.length == 0){
            console.log("no valid terms");
            return all;
        }
        else {

            let results:Vendor[] = [];

            for(let v in all){
                let current = all[v];
                if(current == null){
                    continue;
                }
                let currentVInfo = current.vendorInfo;
                if(currentVInfo == null){
                    continue;
                }

                let names:VendorInfo[] = currentVInfo.vendorName;
                let stallName:string = currentVInfo.stallName;
                let address = null;
                if(currentVInfo.address!=null){
                    address = currentVInfo.address.address;
                }
                let keywords:string[] = currentVInfo.keywords;
                let include:boolean = false;

                //names
                if(names!=null && names.length>0){
                    for(let k in names){
                        let first = names[k].firstName.trim().toLowerCase();
                        let last = names[k].lastName.trim().toLowerCase();
                        let whole = first + " " + last;
                        for(let tt in terms){
                            if(include){
                                break;
                            }
                            let term = terms[tt].trim().toLowerCase();
                            if (first.includes(term) || last.includes(term) || whole.includes(term)){
                                console.log("first or last: "+first + " "+last + " "+ term);
                                include = true;
                            }
                        }
                    }
                }

                //stallname
                if(!include){
                    if(stallName!=null && stallName!=""){
                        for(let tt in terms){
                            if(include){
                                break;
                            }
                            let term = terms[tt].trim().toLowerCase();
                        if(stallName.trim().toLowerCase().includes(term)){
                            console.log("stallname: "+stallName + " "+ term);
                            include = true;
                        }
                        }
                    }
                }

                //address
                if(!include){
                    if(address!=null && address!=""){
    
                        for(let tt in terms){
                            if(include){
                                break;
                            }
                            let term = terms[tt].trim().toLowerCase();
                        if(address.trim().toLowerCase().includes(term)){
                            console.log("address: "+address+" "+term);
                            include = true;
                        }
                        }
                    }

                }

                //keywords

                if(!include){
                    if(keywords!=null && keywords.length>0){
                        for(let tt in terms){
                            if(include){
                                break;
                            }
                        for(let z in keywords){
                            if(include){
                                break;
                            }
                            let term = terms[tt].trim().toLowerCase();
                            if(keywords[z].trim().toLowerCase().includes(term)){
                                console.log("keywords: "+keywords[z]+" "+term);
                                include = true;
                            }
                        }
                    }
                    }
                }

                if(include){
                    results.push(current);
                }

            }

            //handling filters now

            if(filters == null || filters.length == 0){
                res.send({success: true, vendors: results, error: "No filters"});
            }else{
        
                let filterlist:Set<string> = new Set<string>();
                for(let k in filters){
                    filterlist.add(filters[k].toLowerCase());
                }
        
                let filtered:Vendor[] = results.filter(v => {
                    
                    if(!(v.vendorInfo == null || v.vendorInfo.flags == null || v.vendorInfo.flags.length == 0)){
                        
                        for(let f in v.vendorInfo.flags){
                            if(filterlist.has(v.vendorInfo.flags[f].toLowerCase())){
                                return v;
                            }
                        }
        
                    }
                   
                });

                if(openSearch){

                    let openFiltered:Vendor[] = filtered.filter(v => {
                        if(TH.isOpen(v)){
                            return v;
                        }
                    });

                    res.send({success: true, vendors: openFiltered});

                }else{

                    res.send({success: true, vendors: filtered});
                }
        
        
        
            }





        }
    });

});


router.post('/search', (req, res) => { //USED ONCE
    let terms: string[] = req.body.terms;
    vendorDB.find({}).toArray((err: any, vendors: any) => {
        let all: Vendor[] = vendors;
        if (err) {
            res.json({success: false, error: err.toString()});
        }
        else if(all == null || all.length == 0){
            res.json({success: false, error: "Error: no vendors"});
        }else if(terms == null || terms == undefined || terms.length == 0){
            console.log("no valid terms");
            return all;
        }
        else {

            let results:Vendor[] = [];

            for(let v in all){
                let current = all[v];
                if(current == null){
                    continue;
                }
                let currentVInfo = current.vendorInfo;
                if(currentVInfo == null){
                    continue;
                }

                let names:VendorInfo[] = currentVInfo.vendorName;
                let stallName:string = currentVInfo.stallName;
                let address = null;
                if(currentVInfo.address!=null){
                    address = currentVInfo.address.address;
                }
                let keywords:string[] = currentVInfo.keywords;
                let include:boolean = false;

                //names
                if(names!=null && names.length>0){
                    for(let k in names){
                        let first = names[k].firstName.trim().toLowerCase();
                        let last = names[k].lastName.trim().toLowerCase();
                        let whole = first + " " + last;
                        for(let tt in terms){
                            if(include){
                                break;
                            }
                            let term = terms[tt].trim().toLowerCase();
                            if (first.includes(term) || last.includes(term) || whole.includes(term)){
                                console.log("first or last: "+first + " "+last + " "+ term);
                                include = true;
                            }
                        }
                    }
                }

                //stallname
                if(!include){
                    if(stallName!=null && stallName!=""){
                        for(let tt in terms){
                            if(include){
                                break;
                            }
                            let term = terms[tt].trim().toLowerCase();
                        if(stallName.trim().toLowerCase().includes(term)){
                            console.log("stallname: "+stallName + " "+ term);
                            include = true;
                        }
                        }
                    }
                }

                //address
                if(!include){
                    if(address!=null && address!=""){
    
                        for(let tt in terms){
                            if(include){
                                break;
                            }
                            let term = terms[tt].trim().toLowerCase();
                        if(address.trim().toLowerCase().includes(term)){
                            console.log("address: "+address+" "+term);
                            include = true;
                        }
                        }
                    }

                }

                //keywords

                if(!include){
                    if(keywords!=null && keywords.length>0){
                        for(let tt in terms){
                            if(include){
                                break;
                            }
                        for(let z in keywords){
                            if(include){
                                break;
                            }
                            let term = terms[tt].trim().toLowerCase();
                            if(keywords[z].trim().toLowerCase().includes(term)){
                                console.log("keywords: "+keywords[z]+" "+term);
                                include = true;
                            }
                        }
                    }
                    }
                }

                if(include){
                    results.push(current);
                }

                

            }

            res.json({success: true, vendors: results});

        }
    });

});

// router.post('/vendor/modify', (req, res) => { //DONE


//     let vendor: Vendor = req.body.vendor;

//     console.log("HEREEEEE2");
//     console.log(vendor.vendorInfo.flags);

//     let success:boolean = false;
//     let open:boolean = TH.isOpen(vendor);
//     try{

//         vendorDB.findOneAndReplace(
//             { 
//                 loginInfo : vendor.loginInfo
//             },
//             {
//                 phone: vendor.phone,
//                 openNow: open,
//                 loginInfo: {
//                     email: vendor.loginInfo.email,
//                     password: vendor.loginInfo.password
//                 },
//                 vendorInfo: {
//                     vendorName: vendor.vendorInfo.vendorName,
//                     stallName: vendor.vendorInfo.stallName,
//                     address: {
//                         address: vendor.vendorInfo.address.address,
//                         coordinates: {
//                             lat: vendor.vendorInfo.address.coordinates.lat,
//                             lng: vendor.vendorInfo.address.coordinates.lng
//                         }
//                     },
//                     keywords: vendor.vendorInfo.keywords,
//                     flags: vendor.vendorInfo.flags,
//                     hours: TH.getHours(vendor.vendorInfo.hours)
//                 }
//             },
//             { returnNewDocument: true },
//             (err:any, res2:any) =>{
//                 res.send(res2.value);
//             }
//         );

//     }catch(e){
//         res.send({
//             success: false,
//             error: e.toString()
//         });

//     }

// });

router.get('/vendorId/:id', (req, res, next) => { //DONE!!!!
    vendorDB.findOne({_id: new ObjectId(req.params.id)}, (err: any, vendor: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(vendor);
        }
    });
});

router.post('/vendor/signup', (req, res) => { //DONE
    let verification: any =
    {
        email: req.body.email,
        hash: req.body.password
    };


    if (verification.email == null || verification.email == undefined || verification.email == ""
        || verification.hash == null || verification.hash == undefined || verification.hash == "") {
        res.json({ success: false, error: "Email or hash empty"});
    }else{

        vendorDB.find({}).toArray((err: any, documents: any)=> {

            let found:boolean = false;
            for(let v in documents){
                let obj = documents[v];
                if(documents[v].loginInfo.email==verification.email){
                    found = true;
                }
            }
    
            if(found){
                res.send({
                    success: false,
                    error: "email already exists"
                });
            }else{
                let newVendor:Vendor = {
                    openNow: false,
                    phone: "",
                    loginInfo: {
                        email: verification.email,
                        password: verification.hash
                    },
                    vendorInfo: {
                        vendorName: [],
                        stallName: "",
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
                }
    
                vendorDB.insertOne(newVendor, (err:any, res2:any)=>{
    
                    if(err){
                        res.send({
                            success: false,
                            error: err
                        }); 
                    }else{
                        res.send({
                            success: true,
                            vendor: newVendor
                        });
                    }
    
                });
            }
    
        });

    }

});

router.post('/vendor/authenticate', (req, res) => { //DONE!!!!
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
        
            loginInfo: {
                email: verification.email,
                password: verification.hash
            }
        }
    , (err: any, vendor: any) => {
        if (err) {
            res.json({ success: false, error: err });
        } else {
            {
                if (vendor) {
                    res.json({ success: true , vendor: vendor});
                } else {
                    res.json({ success: false });
                }
            }
        }
    })

});


router.get('/initvendors', (req, res) => { //DONE

    vendorDB.insertMany(vendorS, (err: any) => {
        if (err) {
            res.send(err)
        } else {
            res.send("success");
        }
    });
});

router.get('/initkeywords', (req, res) => { //DONE

    let keywords:Set<String> = new Set<String>();
    
    vendorS.forEach(x =>{
        x.vendorInfo.keywords.forEach(k => {
            k = k.trim().toLowerCase();
            if(!keywords.has(k)){
                keywords.add(k);
            }
        });
    });

    let karray:any[] = [];
    
    Array.from(keywords).forEach(x => {

        karray.push({keyword: x});

    });

    keywordDB.insertMany(karray, (err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send("success");
        }
    });
}); 




router.get('/test', (req, res) => {
        
    let vendor:Vendor =     {
        phone: "+16508239461",
        openNow: true,
        loginInfo: {
            email:"devikaku@usc.edu",
            password:"hellohello"
        },
        vendorInfo: {
            vendorName: [{
                firstName:"Devika",
                lastName:"Kumar"
            },
            {
                firstName:"Sonali",
                lastName:"Pai"
            }
            ],
            stallName: "Devika's Pies",
            address: {
                address: "3760 Fig",
                coordinates: {
                    lat: 222,
                    lng: 3333
                }
            },
            keywords: [
                "pie", "usc"
            ],
            flags: ["v"],
            hours: [
                {
                    open:true,
                    startTime: 900,
                    endTime: 500,
                },
                {
                    open:true,
                    startTime: 900,
                    endTime: 500,
                },
                {
                    open:true,
                    startTime: 900,
                    endTime: 500,
                },
                {
                    open:true,
                    startTime: 900,
                    endTime: 1750,
                },
                {
                    open:true,
                    startTime: 900,
                    endTime: 1800,
                },
                {
                    open:true,
                    startTime: 900,
                    endTime: 500,
                },
                {
                    open:false,
                    startTime: 900,
                    endTime: 500,
                }
            ]
        },
        
};
    let open:boolean = TH.isOpen(vendor);
                res.send({open: open});
        
        
});

export default router;