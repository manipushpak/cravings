"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Main_css_1 = __importDefault(require("./../styles/Main.css"));
var react_router_dom_1 = require("react-router-dom");
var Home_jsx_1 = __importDefault(require("./Home.jsx"));
var About_jsx_1 = __importDefault(require("./About.jsx"));
var Vendors_jsx_1 = __importDefault(require("./Vendors.jsx"));
var Registration_jsx_1 = __importDefault(require("./Registration.jsx"));
var Main = function () {
    return (<main className={Main_css_1.default.outerContainer}>
         <react_router_dom_1.Switch>
            <react_router_dom_1.Route exact path='/' component={Home_jsx_1.default}/>
            <react_router_dom_1.Route path='/about' component={About_jsx_1.default}/>
            <react_router_dom_1.Route path='/vendors' component={Vendors_jsx_1.default}/>
            <react_router_dom_1.Route path='/registration' component={Registration_jsx_1.default}/>
         </react_router_dom_1.Switch>
      </main>);
};
exports.default = Main;
