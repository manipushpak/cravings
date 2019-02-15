"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Vendors_css_1 = __importDefault(require("../styles/Vendors.css"));
var List_jsx_1 = __importDefault(require("./List.jsx"));
var Map_jsx_1 = __importDefault(require("./Map.jsx"));
var Vendors = /** @class */ (function (_super) {
    __extends(Vendors, _super);
    function Vendors(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            vendors: []
        };
        return _this;
    }
    Vendors.prototype.componentDidMount = function () {
        var _this = this;
        fetch('/vendors')
            .then(function (res) { return res.json(); })
            .then(function (vendors) {
            _this.setState({ vendors: vendors });
        });
    };
    Vendors.prototype.render = function () {
        var vendorsList = [
            {
                name: "Sophia's Tacos",
                location: "Taco Street",
                coords: {
                    lat: 34.0254,
                    lng: -118.2852
                },
                open: true,
            },
            {
                name: "Devika's Cakes",
                location: "Cake Blvd.",
                coords: {
                    lat: 34.0141,
                    lng: -118.2879
                },
                open: false,
            },
            {
                name: "Mani's Sushi",
                location: "Sushi Lane",
                coords: {
                    lat: 34.0224,
                    lng: -118.2851
                },
                open: false,
            },
            {
                name: "Sonali's Lemonade",
                location: "Lemonade & Brownies",
                coords: {
                    lat: 34.0232,
                    lng: -118.2801
                },
                open: true,
            },
        ];
        return (<div className={Vendors_css_1.default.outerContainer}>
            <div className={Vendors_css_1.default.searchBar}>
               Search Bar Here
            </div>
            <div className={Vendors_css_1.default.listColumn}>
               <List_jsx_1.default vendors={this.state.vendors}/>
            </div>
            <div className={Vendors_css_1.default.mapColumn}>
               <Map_jsx_1.default vendors={this.state.vendors}/>
            </div>
         </div>);
    };
    return Vendors;
}(react_1.default.Component));
exports.default = Vendors;
