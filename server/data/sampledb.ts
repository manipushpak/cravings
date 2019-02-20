import { Vendor, User } from "../models/types";

const vendors: Vendor[] = [
    {
        _id : "1",
        stallName: "Taco Stand",
        email: "sonali@usc.edu",
        vendorName: [
            "Sonali", "Pia"
        ],
        location: {
            address: "3770 S Fig",
            coordinates: {
                lat: 34.0254,
                lng: -118.2852
            }
        },
        week:["Monday", "Tuesday"],
        password: "ilovecravings1",
        hours: [
            {open: true,
            startTime: 900,
            endTime: 500}
        ],
        keywords: [
            "taco",
            "yummy"
        ],
        phone: "6508239461",
        open:true
    },
    {
        _id : "2",
        stallName:  "Sonali's Noodles",
        email: "sonali2@usc.edu",
        vendorName: [
            "Sonali", "Pia"
        ],
        location: {
            address: "Tuscany Apartments",
            coordinates: {
                lat: 34.0141,
                lng: -118.2879
            }
        },
        week:["Sunday", "Tuesday"],
        password: "ilovecravings2",
        hours: [
            {open: true,
            startTime: 1000,
            endTime: 500}
        ],
        keywords: [
            "ramen",
            "noods"
        ],
        phone: "6508239461",
        open:true
    },
    {
        _id : "3",
        stallName:  "Pia's Pies",
        email: "pia@usc.edu",
        vendorName: [
            "Sonali", "Pia"
        ],
        location: {
            address: "TCC",
            coordinates: {
                lat: 34.0224,
                lng: -118.2851
            }
        },
        week:["Saturday", "Sunday", "Monday"],
        password: "ilovecravings4",
        hours: [
            {open: true,
            startTime: 900,
            endTime: 500}
        ],
        keywords: [
            "pies",
            "apple pies"
        ],
        phone: "6508239461",
        open:true
    },
    {
        _id: "7",
        stallName:  "Sophia's Tacos",
        email: "sonali3@usc.edu",
        vendorName: [
            "Sonali", "Pia"
        ],
        location: {
        address: "Taco Street",
        coordinates: {
           lat: 34.0254,
           lng: -119.2852
        }
        },   
        week:["Saturday", "Sunday", "Monday"],
        password: "ilovecravings1",
        hours: [
            {open: true,
            startTime: 900,
            endTime: 500}
        ],
        keywords: [
            "tacos",
            "usc"
        ],
        phone: "6508239461",
        open:true
     },
     {
        _id: "8",
        stallName:  "Devika's Cakes",
        email: "sonali5@usc.edu",
        vendorName: [
            "Sonali", "Devika"
        ],
        location: 
        {address: "Cake Blvd.",
        coordinates: {
           lat: 34.0141,
           lng: -119.2879
        }
        },
        week:["Saturday", "Sunday", "Monday", "Tuesday"],
        password: "ilovecravings1",
        hours: [
            {open: true,
            startTime: 900,
            endTime: 500}
        ],
        keywords: [
            "cakes",
            "usc"
        ],
        phone: "6508239461",
        open:true
     },
     {
         _id: "9",
         stallName:  "Mani's Sushi",
        email: "mani@usc.edu",
        vendorName: [
            "Sonali", "Mani"
        ],
        location: {
            address: "Sushi Lane",
        coordinates: {
           lat: 34.0224,
           lng: -119.2851
        }
        },
        week:["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
        password: "ilovecravings1",
        hours: [
            {open: true,
            startTime: 900,
            endTime: 500}
        ],
        keywords: [
            "sushi",
            "salmon"
        ],
        phone: "6508239461",
        open:false
     },
     {
         _id: "10",
        stallName: "Sonali's Lemonade",
        email: "sonali7@usc.edu",
        vendorName: [
            "Devika", "Pia"
        ],
        location: 
        {address: "Lemonade & Brownies",
        coordinates: {
           lat: 34.0232,
           lng: -119.2801
        }
        },
        password: "ilovecravings1",
        hours: [
            {open: true,
            startTime: 900,
            endTime: 500}
        ],
        keywords: [
            "lemonade",
            "brownies"
        ],
        phone: "6508239461",
        open:false
     },
];

export default vendors;