import VendorLocation from "./location";

export default class Vendor {

  constructor(name, location, keywords, phone){
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