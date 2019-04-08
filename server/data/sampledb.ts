import { Vendor, User } from "../models/types";

const vendors: Vendor[] = [

    {
        loginInfo: {
            email:"devikaku@usc.edu",
            password:"hellohello"
        },
        vendorInfo: {
            vendorName: [{
                firstName:"Devika",
                lastName:"Kumar"
            },
            {
                firstName:"Sonali",
                lastName:"Pai"
            }
            ],
            stallName: "Devika's Pies",
            phone: "6508239461",
            address: {
                address: "3760 Fig",
                coordinates: {
                    lat: 222,
                    lng: 3333
                }
            },
            keywords: [
                "pie", "usc"
            ],
            flags: ["v", "g-f", "d-f", "h", "k"],
            hours: [
                {
                    open:true,
                    startTime: 900,
                    endTime: 500,
                },
                {
                    open:true,
                    startTime: 900,
                    endTime: 500,
                },
                {
                    open:true,
                    startTime: 900,
                    endTime: 500,
                },
                {
                    open:true,
                    startTime: 900,
                    endTime: 500,
                },
                {
                    open:true,
                    startTime: 900,
                    endTime: 500,
                },
                {
                    open:true,
                    startTime: 900,
                    endTime: 500,
                },
                {
                    open:false,
                    startTime: 900,
                    endTime: 500,
                }
            ]
        },
        
},
{
    loginInfo: {
        email:"sonalipa@usc.edu",
        password:"hellohello1"
    },
    vendorInfo: {
        vendorName: [{
            firstName:"Sonali",
            lastName:"Pai"
        },
        {
            firstName:"Mani",
            lastName:"Gupta"
        }
        ],
        stallName: "Sonali's Noodles",
        phone: "6508239461",
        address: {
            address: "3760 Fig",
            coordinates: {
                lat: 225,
                lng: 333
            }
        },
        keywords: [
            "noodles", "usc"
        ],
        flags: ["v", "g-f", "d-f", "h", "k"],
        hours: [
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:false,
                startTime: 900,
                endTime: 500,
            }
        ]
    },
    
},
{
    loginInfo: {
        email:"pia@usc.edu",
        password:"hellohello2"
    },
    vendorInfo: {
        vendorName: [{
            firstName:"Pia",
            lastName:"Tiutan"
        }
        ],
        stallName: "Pia's Pudding",
        phone: "6508239461",
        address: {
            address: "343 West Adams",
            coordinates: {
                lat: 555,
                lng: 340
            }
        },
        keywords: [
            "pudding", "usc", "trojans"
        ],
        flags: ["v", "g-f", "h", "k"],
        hours: [
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:false,
                startTime: 1000,
                endTime: 500,
            },
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:false,
                startTime: 900,
                endTime: 500,
            }
        ]
    }
    
    
},
{
    loginInfo: {
        email:"miller@usc.edu",
        password:"hellohello4"
    },
    vendorInfo: {
        vendorName: [{
            firstName:"Jeffrey",
            lastName:"Miller"
        }
        ],
        stallName: "Nalani's Girls Scout Cookies",
        phone: "6508239461",
        address: {
            address: "Stauffer Science Lecture Hall",
            coordinates: {
                lat: 600,
                lng: 340
            }
        },
        keywords: [
            "cookies"
        ],
        flags: ["v", "g-f", "h", "k"],
        hours: [
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:false,
                startTime: 1000,
                endTime: 500,
            },
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:true,
                startTime: 900,
                endTime: 500,
            },
            {
                open:false,
                startTime: 900,
                endTime: 500,
            }
        ]
    }
}
]

export default vendors;