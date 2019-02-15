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
var Form_1 = __importDefault(require("react-bootstrap/Form"));
var TimeOptions = /** @class */ (function (_super) {
    __extends(TimeOptions, _super);
    function TimeOptions(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    TimeOptions.prototype.render = function () {
        return (<Form_1.default.Control as="select" onChange={this.props.onChange} xs={6} md={3} required>
                <option>{this.props.placeholder}</option>
                <option value="0000">12:00 AM</option>
                <option value="0030">12:30 AM</option>
                <option value="0100">01:00 AM</option>
                <option value="0130">01:30 AM</option>
                <option value="0200">02:00 AM</option>
                <option value="0230">02:30 AM</option>
                <option value="0300">03:00 AM</option>
                <option value="0330">03:30 AM</option>
                <option value="0400">04:00 AM</option>
                <option value="0430">04:30 AM</option>
                <option value="0500">05:00 AM</option>
                <option value="0530">05:30 AM</option>
                <option value="0600">06:00 AM</option>
                <option value="0630">06:30 AM</option>
                <option value="0700">07:00 AM</option>
                <option value="0730">07:30 AM</option>
                <option value="0800">08:00 AM</option>
                <option value="0830">08:30 AM</option>
                <option value="0900">09:00 AM</option>
                <option value="0930">09:30 AM</option>
                <option value="1000">10:00 AM</option>
                <option value="1030">10:30 AM</option>
                <option value="1100">11:00 AM</option>
                <option value="1130">11:30 AM</option>
                <option value="1200">12:00 PM</option>
                <option value="1230">12:30 PM</option>
                <option value="1300">01:00 PM</option>
                <option value="1330">01:30 PM</option>
                <option value="1400">02:00 PM</option>
                <option value="1430">02:30 PM</option>
                <option value="1500">03:00 PM</option>
                <option value="1530">03:30 PM</option>
                <option value="1600">04:00 PM</option>
                <option value="1630">04:30 PM</option>
                <option value="1700">05:00 PM</option>
                <option value="1730">05:30 PM</option>
                <option value="1800">06:00 PM</option>
                <option value="1830">06:30 PM</option>
                <option value="1900">07:00 PM</option>
                <option value="1930">07:30 PM</option>
                <option value="2000">08:00 PM</option>
                <option value="2030">08:30 PM</option>
                <option value="2100">09:00 PM</option>
                <option value="2130">09:30 PM</option>
                <option value="2200">10:00 PM</option>
                <option value="2230">10:30 PM</option>
                <option value="2300">11:00 PM</option>
                <option value="2330">11:30 PM</option>
            </Form_1.default.Control>);
    };
    return TimeOptions;
}(react_1.default.Component));
exports.default = TimeOptions;
