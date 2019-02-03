export interface Vendor{
    _id?:string;
    name:string;
    location:VendorLocation;
    keywords:string[];
    phone:string;
}
export interface VendorLocation{
    _id?:string;
    address?:string;
    coordinates?:number[];
}

export interface User{
    _id?:string;
    name:string;
    email:string;
    username:string;
    password:string;
}