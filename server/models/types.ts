export interface Vendor{
    name:string;
    location:VendorLocation;
    keywords?:string[];
    phone:string;
}
export interface VendorLocation{
    address?:string;
    coordinates?:number[];
}