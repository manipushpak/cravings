export default class VendorLocation {

  constructor(address, coordinates){
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