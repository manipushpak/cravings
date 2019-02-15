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
var ListItem_css_1 = __importDefault(require("../styles/ListItem.css"));
var ListItem = /** @class */ (function (_super) {
    __extends(ListItem, _super);
    function ListItem(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    ListItem.prototype.render = function () {
        return (<div className={ListItem_css_1.default.outerContainer}>
            <h3>{this.props.name}</h3>
            <p>
               {this.props.location}
               <br />
               <span className={this.props.open ? ListItem_css_1.default.storeOpen : ListItem_css_1.default.storeClosed}>
                  {this.props.open ? "open " : "closed "}
               </span>
                9:00 AM - 5:00 PM
            </p>
         </div>);
    };
    return ListItem;
}(react_1.default.Component));
exports.default = ListItem;
