import { Vendor, User } from "../models/types";
import vendors from "./sampledb";
import users from "./sampledbusers";

export default class DataManager {


  constructor() { }

  createVendor(vendor: Vendor): void {
    //testing purposes:
    vendor._id = Math.floor(Math.random() * (1000 - 10) + 10).toString();
    vendors.push(vendor);
  }
=======
    console.log("ADDED A VENDOR");
    }
>>>>>>> 02f05b8ec2adb62d1c2e41745f8b1a217cb486a3

  getVendors(): Vendor[] {
    return vendors;
  }

  getVendorSearch(filter: string, term: string): Vendor[] {
    //talk about filtering by address bc a little more complicated
    if (filter.trim() === "name") {
      return this.getVendors().filter(v => v.name.trim().toLowerCase().indexOf(term.trim().toLowerCase()) > -1);
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

  getVendor(id: string): any {
    let res: Vendor[] = vendors.filter(v => v._id === id);
    if (res == null || res == undefined || res.length == 0) {
      return null;
    }
    return res[0];
  }

  createUser(user: User): void {
    //testing purposes:
    user._id = Math.floor(Math.random() * (1000 - 10) + 10).toString();
    users.push(user);
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