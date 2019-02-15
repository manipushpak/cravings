"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_router_bootstrap_1 = require("react-router-bootstrap");
var react_bootstrap_1 = require("react-bootstrap");
var Header = function () {
    return (<header>
         <react_bootstrap_1.Navbar collapseOnSelect expand="lg" bg="light">
            <react_bootstrap_1.Navbar.Brand>
               <react_router_dom_1.Link to="/">Cravings</react_router_dom_1.Link>
            </react_bootstrap_1.Navbar.Brand>
            <react_bootstrap_1.Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <react_bootstrap_1.Navbar.Collapse id="responsive-navbar-nav">
               <react_bootstrap_1.Nav className="mr-auto">
                  <react_router_bootstrap_1.LinkContainer to="/about">
                     <react_bootstrap_1.Nav.Link>About</react_bootstrap_1.Nav.Link>
                  </react_router_bootstrap_1.LinkContainer>
                  <react_router_bootstrap_1.LinkContainer to="/vendors">
                     <react_bootstrap_1.Nav.Link eventKey={2}>Vendors</react_bootstrap_1.Nav.Link>
                  </react_router_bootstrap_1.LinkContainer>
               </react_bootstrap_1.Nav>
               <react_bootstrap_1.Nav>
                  <react_router_bootstrap_1.LinkContainer to="/registration">
                     <react_bootstrap_1.Nav.Link eventKey={3}>Registration</react_bootstrap_1.Nav.Link>
                  </react_router_bootstrap_1.LinkContainer>
               </react_bootstrap_1.Nav>
            </react_bootstrap_1.Navbar.Collapse>
         </react_bootstrap_1.Navbar> 
      </header>);
};
exports.default = Header;
