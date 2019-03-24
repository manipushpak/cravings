"use strict";
// import mongoose = require('mongoose');
// import { VendorLocation, TimeFrame } from '../../models/types';
// export interface IVendor extends mongoose.Document {
//     stallName:string;
//     vendorName:string[];
//     email:string;
//     password:string;
//     location:VendorLocation;
//     keywords:string[];
//     week?: string[];
//     hours?:TimeFrame[];
//     phone:string;
//     open:boolean;
// }; 
// export const ITimeFrame = new mongoose.Schema({
//     open: {type:Boolean, required: true},
//     startTime: {type:Number, required: true},
//     endTime: {type:Number, required: true},
// });
// export const ILocationCoordinates = new mongoose.Schema({
//     lat: {type:Number, required: true},
//     lng: {type:Number, required: true},
// });
// export const IVendorLocation = new mongoose.Schema({
//     address: {type:String, required: true},
//     coordinates: {type:ILocationCoordinates, required: true},
// });
// export const VendorSchema = new mongoose.Schema({
//     stallName: {type:String, required: true},
//     vendorName: [{type:String, required: true}],
//     email: {type:String, required: true},
//     password: {type:String, required: true},
//     location: {type:IVendorLocation, required: false},
//     keywords: [{type:String, required: true}],
//     week: [{type:String, required: false}],
//     hours: [{type:ITimeFrame, required: false}],
//     phone: {type:String, required: true},
//     open: {type:Boolean, required: true},
// });
// const IVendor = mongoose.model('Vendor', VendorSchema);
// export default IVendor;
