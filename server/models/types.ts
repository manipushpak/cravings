export interface Vendor{
    _id?:string;
    stallName:string;
    vendorName:string[];
    email:string;
    password:string;
    location:VendorLocation;
    keywords:string[];
    week?: string[];
    hours?:TimeFrame[];
    phone:string;
    open:boolean;

    //week, hours optional
}
export interface VendorLocation{
    address:string;
    coordinates:LocationCoordinates;
}

export interface TimeFrame{
    open:boolean;
    startTime: number;
    endTime: number;
}

export interface LocationCoordinates{
    lat:number;
    lng:number;
}

export interface User{
    _id?:string;
    name:string;
    email:string;
    password:string;
    phone:string;
}