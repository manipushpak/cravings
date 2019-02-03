import { Vendor, User } from "../models/types";

const vendors: Vendor[] = [
    {
        _id : "1",
        name: "Taco Stand",
        location: {
            "address": "3770 S Fig",
            "coordinates": [
                60,
                60
            ]
        },
        keywords: [
            "taco",
            "yummy"
        ],
        phone: "6508239461"
    },
    {
        "_id" : "2",
        "name": "Fruit Stand",
        "location": {
            "address": "3770 S Vermont",
            "coordinates": [
                70,
                70
            ]
        },
        "keywords": [
            "fruit",
            "fresh"
        ],
        "phone": "6503835333"
    },
    {
        "_id" : "3",
        "name": "devika's cakes",
        "location": {
            "address": "none of ur business",
            "coordinates": [
                50,
                50
            ]
        },
        "keywords": [
            "cake",
            "fun"
        ],
        "phone": "6504545454"
    }
];

export default vendors;