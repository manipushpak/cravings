import { Vendor } from "../models/types";
import vendors from "./sampledb";

export default class DataManager {

    constructor(){}

    createVendor(vendor:Vendor){
    vendors.push(vendor);
    }

    getVendors(){
    return vendors;
    }
  }