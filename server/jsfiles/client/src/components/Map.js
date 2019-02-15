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
var Map_css_1 = __importDefault(require("../styles/Map.css"));
var react_google_maps_1 = require("react-google-maps");
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            userLocation: { lat: 34.0224, lng: -118.2851 },
            loading: true
        };
        return _this;
    }
    Map.prototype.componentDidMount = function (props) {
        var _this = this;
        navigator.geolocation.getCurrentPosition(function (position) {
            var _a = position.coords, latitude = _a.latitude, longitude = _a.longitude;
            _this.setState({
                userLocation: { lat: latitude, lng: longitude },
                loading: false
            });
        }, function () {
            _this.setState({ loading: false });
        });
    };
    Map.prototype.render = function () {
        var _this = this;
        var _a = this.state, userLocation = _a.userLocation, loading = _a.loading;
        if (loading) {
            return <div className={Map_css_1.default.loadingDiv}>Loading...</div>;
        }
        var GoogleMapExample = react_google_maps_1.withGoogleMap(function (props) { return (<react_google_maps_1.GoogleMap defaultCenter={userLocation} defaultZoom={13}>
            {_this.props.vendors.map(function (vendor) {
            return (<react_google_maps_1.Marker key={vendor.name} position={vendor.location.coordinates}></react_google_maps_1.Marker>);
        })}            
         </react_google_maps_1.GoogleMap>); });
        return (<div>
            <GoogleMapExample containerElement={<div style={{ height: '500px', width: '100%' }}/>} mapElement={<div style={{ height: '100%' }}/>}/>
         </div>);
    };
    return Map;
}(react_1.default.Component));
exports.default = Map;
