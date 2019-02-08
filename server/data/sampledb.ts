import { Vendor, User } from "../models/types";

const vendors: Vendor[] = [
    {
        _id : "1",
        name: "Taco Stand",
        location: {
            address: "3770 S Fig",
            coordinates: {
                lat: 34.0254,
                lng: -118.2852
            }
        },
        week:["Monday", "Tuesday"],
        hours: [900, 500],
        keywords: [
            "taco",
            "yummy"
        ],
        phone: "6508239461",
        open:true
    },
    {
        _id : "2",
        name: "Sonali's Noodles",
        location: {
            address: "Tuscany Apartments",
            coordinates: {
                lat: 34.0141,
                lng: -118.2879
            }
        },
        week:["Sunday", "Tuesday"],
        hours: [1000, 500],
        keywords: [
            "ramen",
            "noods"
        ],
        phone: "6508239461",
        open:true
    },
    {
        _id : "3",
        name: "Pia's Pies",
        location: {
            address: "TCC",
            coordinates: {
                lat: 34.0224,
                lng: -118.2851
            }
        },
        week:["Saturday", "Sunday", "Monday"],
        hours: [930, 530],
        keywords: [
            "pies",
            "apple pies"
        ],
        phone: "6508239461",
        open:true
    },
    {
        _id: "7",
        name: "Sophia's Tacos",
        location: {
        address: "Taco Street",
        coordinates: {
           lat: 34.0254,
           lng: -118.2852
        }
        },   
        week:["Saturday", "Sunday", "Monday"],
        hours: [930, 530],
        keywords: [
            "tacos",
            "usc"
        ],
        phone: "6508239461",
        open:true
     },
     {
        _id: "8",
        name: "Devika's Cakes",
        location: 
        {address: "Cake Blvd.",
        coordinates: {
           lat: 34.0141,
           lng: -118.2879
        }
        },
        week:["Saturday", "Sunday", "Monday", "Tuesday"],
        hours: [1030, 530],
        keywords: [
            "cakes",
            "usc"
        ],
        phone: "6508239461",
        open:true
     },
     {
         _id: "9",
        name: "Mani's Sushi",
        location: {
            address: "Sushi Lane",
        coordinates: {
           lat: 34.0224,
           lng: -118.2851
        }
        },
        week:["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
        keywords: [
            "sushi",
            "salmon"
        ],
        phone: "6508239461",
        open:false
     },
     {
         _id: "10",
        name: "Sonali's Lemonade",
        location: 
        {address: "Lemonade & Brownies",
        coordinates: {
           lat: 34.0232,
           lng: -118.2801
        }
        },
        keywords: [
            "lemonade",
            "brownies"
        ],
        phone: "6508239461",
        open:false
     },
];

export default vendors;