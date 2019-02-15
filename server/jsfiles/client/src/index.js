"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var react_router_dom_1 = require("react-router-dom");
var App_jsx_1 = __importDefault(require("./components/App.jsx"));
react_dom_1.default.render((<react_router_dom_1.HashRouter>
        <App_jsx_1.default />
    </react_router_dom_1.HashRouter>), document.getElementById('App'));
