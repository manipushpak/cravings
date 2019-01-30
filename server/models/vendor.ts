import VendorLocation from "./location";

export default class Vendor {

  name:string;
  location:VendorLocation;
  keywords:string[];
  phone:string;
  constructor(name:string, location:VendorLocation, keywords:string[], phone:string){
     this.name = name;
     this.location = location;
     this.keywords = keywords;
     this.phone = phone;
   }

   getName(){
     return this.name;
   }
   getLocation(){
     return this.location;
   }

   getKeywords(){
     return this.keywords;
   }

   getPhone(){
     return this.phone;
   }
}