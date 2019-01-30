export default class VendorLocation {

  address:string;
  coordinates:number[];
  constructor(address:string, coordinates:number[]){
       this.address = address;
       this.coordinates = coordinates;
     }
  
     getAddress(){
       return this.address;
     }
     getCoordinates(){
       return this.coordinates;
     }
  }