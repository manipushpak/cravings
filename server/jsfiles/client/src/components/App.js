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
var Header_jsx_1 = __importDefault(require("./Header.jsx"));
var Main_jsx_1 = __importDefault(require("./Main.jsx"));
var Footer_jsx_1 = __importDefault(require("./Footer.jsx"));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
        // Define App state object contents here
        };
        return _this;
    }
    App.prototype.render = function () {
        return (<div>
            <Header_jsx_1.default />
            <Main_jsx_1.default />
            <Footer_jsx_1.default />
         </div>);
    };
    return App;
}(react_1.default.Component));
exports.default = App;
