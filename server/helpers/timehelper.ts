import { Vendor } from "../models/types";
import { TimeFrame } from "../models/types";
import { MongooseDocument } from "mongoose";
import {Moment} from "moment";
import moment = require("moment");

class TimeHelper{

    constructor(){


    }

  public static isOpen(vendor:Vendor):boolean {

    let times:TimeFrame[] = vendor.vendorInfo.hours;
    if(times == null || times.length == 0){
        return false;
    }

    let currDate:string = moment().format("e HH mm");
    let dayindex:number = (parseInt(currDate.charAt(0)));
    let currhour:number = (parseInt(currDate.substring(2, 4)));
    let currmin:number = (parseInt(currDate.substring(5, currDate.length)));



    
    console.log(dayindex);

    let currTime:TimeFrame = times[dayindex];
    if(currTime.open = false){
        return false;
    }

    let curr:number = currhour*100 + currmin;

    console.log(currTime.startTime);
    console.log(curr);
    console.log(currTime.endTime);
    


    if(curr >= currTime.startTime && curr < currTime.endTime){
        return true;
    }

    return false;
}

} export {TimeHelper as TH};