import { Vendor, User } from "../models/types";
import vendors from "./sampledb";
import users from "./sampledbusers";
import { any } from "prop-types";

export default class DataManager {


  constructor() { }

  createVendor(vendor: Vendor): void {
    //testing purposes:
    vendor._id = Math.floor(Math.random() * (1000 - 10) + 10).toString();
    vendors.push(vendor);
  }

  getVendors(): Vendor[] {
    return vendors;
  }

  getVendorSearch(filter: string, term: string): Vendor[] {
    //talk about filtering by address bc a little more complicated
    if (filter.trim() === "name") {
      return this.getVendors().filter(v => v.stallName.trim().toLowerCase().indexOf(term.trim().toLowerCase()) > -1);
    }else if (filter.trim() === "keywords") {
      let filtered:Vendor[] = [];


      let all:Vendor[] = this.getVendors();
      for(let i = 0; i < all.length; i++){
        let v:Vendor = all[i];
        let add:boolean = false;
        if (v != undefined && v != null) {
          for (let j = 0; j<v.keywords.length; j++) {
            let k:string = v.keywords[j];
            if (k.trim().toLowerCase() === term.trim().toLowerCase()) {
              add = true;
            }
          }
        }
        if(add){
          filtered.push(v);
        }
      }
      return filtered;
    }else {
      return [];
    }
  }

  getVendorById(id: string): any {
    let res: Vendor[] = vendors.filter(v => v._id === id);
    if (res == null || res == undefined || res.length == 0) {
      return null;
    }
    return res[0];
  }

  getVendorByEmail(email: string): any {
    let res: Vendor[] = vendors.filter(v => v.email === email);
    if (res == null || res == undefined || res.length == 0) {
      return null;
    }
    return res[0];
  }

  authenticateVendor(verification:any): any{
    if(verification.email == null || verification.email == undefined || verification.email == ""
    || verification.hash == null || verification.hash == undefined || verification.hash == ""){
       return {success: false};
    }
 
    let vendors:Vendor[] = this.getVendors();
    for(let i = 0; i<vendors.length; i++){
      let vendor:Vendor = vendors[i];
      if(vendor.email === verification.email &&
       vendor.password === verification.hash){
         return {success: true};
       }
   }
 
   return false;
  }

  authenticateUser(verification: any): any {
   if(verification.email == null || verification.email == undefined || verification.email == ""
   || verification.hash == null || verification.hash == undefined || verification.hash == ""){
      return {success: false};
   }

   let users:User[] = this.getUsers();
   for(let i = 0; i<users.length; i++){
     let user:User = users[i];
     if(user.email === verification.email &&
      user.password === verification.hash){
        return {success: true};
      }
  }

  return false;
}

  createUser(user: User): any {

    let users:User[] = this.getUsers();
    for(let i = 0; i<users.length; i++){
      let u:User = users[i];
      if(u.email === user.email){
         return {success: false};
       }
   }

    //testing purposes:
    user._id = Math.floor(Math.random() * (1000 - 10) + 10).toString();
    users.push(user);

    return {success: true};

  }

  getUsers(): User[] {
    return users;
  }

  getUser(id: string): any {
    let res: User[] = users.filter(v => v._id === id);
    if (res == null || res == undefined || res.length == 0) {
      return null;
    }
    return res[0];
  }
}