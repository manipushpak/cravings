export interface Vendor{
        id?:string,
        phone: string,
        loginInfo: {
            email:string
            password:string
        },
        vendorInfo: {
            vendorName: VendorInfo[],
            stallName: string,
            address: Location,
            keywords: string[],
            flags: string[],
            hours: TimeFrame[]
        }
}

export interface VendorInfo{
    
        firstName:string;
        lastName:string;
    
}

export interface Location{
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