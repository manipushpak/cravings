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
var Registration_css_1 = __importDefault(require("../styles/Registration.css"));
var Button_1 = __importDefault(require("react-bootstrap/Button"));
var Col_1 = __importDefault(require("react-bootstrap/Col"));
var Form_1 = __importDefault(require("react-bootstrap/Form"));
var StateOptions_jsx_1 = __importDefault(require("./RegistrationElements/StateOptions.jsx"));
var TimeOptions_jsx_1 = __importDefault(require("./RegistrationElements/TimeOptions.jsx"));
var Registration = /** @class */ (function (_super) {
    __extends(Registration, _super);
    function Registration(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            name: '',
            phone: '',
            address: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            week: [],
            startTime: null,
            endTime: null,
            coordinates: null,
            keywords: [],
            validated: false
        };
        _this.updateName = _this.updateName.bind(_this);
        _this.updatePhone = _this.updatePhone.bind(_this);
        _this.updateAddress = _this.updateAddress.bind(_this);
        _this.updateAddress2 = _this.updateAddress2.bind(_this);
        _this.updateCity = _this.updateCity.bind(_this);
        _this.updateState = _this.updateState.bind(_this);
        _this.updateZip = _this.updateZip.bind(_this);
        _this.updateWeek = _this.updateWeek.bind(_this);
        _this.updateStartTime = _this.updateStartTime.bind(_this);
        _this.updateEndTime = _this.updateEndTime.bind(_this);
        _this.updateKeywords = _this.updateKeywords.bind(_this);
        _this.handleClearForm = _this.handleClearForm.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    Registration.prototype.handleClearForm = function () {
        console.log("hello");
        this.setState({
            name: '',
            phone: '',
            address: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            week: [],
            startTime: null,
            endTime: null,
            coordinates: null,
            keywords: [],
            validated: false
        });
    };
    Registration.prototype.handleSubmit = function (event) {
        // We don't want the form to submit, so we prevent the default behavior
        event.preventDefault();
        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation;
            this.setState({ validated: true });
        }
        else {
            var completeAddress = this.state.address + (this.state.address2 === '' ? "" : " " + this.state.address2)
                + ", " + this.state.city + ", " + this.state.state + " " + this.state.zip;
            fetch('/vendor/create', {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.name,
                    phone: this.state.phone,
                    location: {
                        address: completeAddress,
                        coordinate: this.state.coordinates
                    },
                    keywords: this.state.keywords
                }),
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                alert("hell yeah");
                return response.json();
            });
        }
    };
    Registration.prototype.updateName = function (e) {
        this.setState({ name: e.target.value });
    };
    Registration.prototype.updatePhone = function (e) {
        this.setState({ phone: e.target.value });
    };
    Registration.prototype.updateAddress = function (e) {
        this.setState({ address: e.target.value });
    };
    Registration.prototype.updateAddress2 = function (e) {
        this.setState({ address2: e.target.value });
    };
    Registration.prototype.updateCity = function (e) {
        this.setState({ city: e.target.value });
    };
    Registration.prototype.updateState = function (e) {
        this.setState({ state: e.target.value });
    };
    Registration.prototype.updateZip = function (e) {
        this.setState({ zip: e.target.value });
    };
    Registration.prototype.updateWeek = function (e) {
        var newWeek = this.state.week.slice();
        if (e.target.checked) {
            newWeek.push(e.target.value);
        }
        else {
            newWeek = newWeek.filter(function (item) { return item !== e.target.value; });
        }
        this.setState({ week: newWeek });
    };
    Registration.prototype.updateStartTime = function (e) {
        this.setState({ startTime: parseInt(e.target.value, 10) });
    };
    Registration.prototype.updateEndTime = function (e) {
        this.setState({ endTime: parseInt(e.target.value, 10) });
    };
    Registration.prototype.updateKeywords = function (e) {
        this.setState({ keywords: e.target.value.split(", ") });
    };
    Registration.prototype.render = function () {
        var _this = this;
        return (<div className={Registration_css_1.default.outercontainer}>
            <h1>Vendor Registration</h1>
            <br />
            <Form_1.default noValidate validated={this.state.validated} onSubmit={function (e) { return _this.handleSubmit(e); }}>
               <Form_1.default.Row>
                  <Form_1.default.Group as={Col_1.default} controlId="vendorName" xs={12} md={6}>
                     <Form_1.default.Label>Vendor Name</Form_1.default.Label>
                     <Form_1.default.Control placeholder="Enter vendor name" onChange={function (e) { return _this.updateName(e); }} required/>
                     <Form_1.default.Control.Feedback type="invalid">Please enter your vendor name.</Form_1.default.Control.Feedback>
                  </Form_1.default.Group>

                  <Form_1.default.Group as={Col_1.default} controlId="phoneNumber" xs={12} md={6}>
                     <Form_1.default.Label>Phone Number</Form_1.default.Label>
                     <Form_1.default.Control placeholder="123-456-7890" pattern="^\d{3}-\d{3}-\d{4}$" onChange={function (e) { return _this.updatePhone(e); }} required/>
                     <Form_1.default.Control.Feedback type="invalid">Please enter your phone number (xxx-xxx-xxxx).</Form_1.default.Control.Feedback>
                  </Form_1.default.Group>
               </Form_1.default.Row>

               <Form_1.default.Group controlId="address">
                  <Form_1.default.Label>Address</Form_1.default.Label>
                  <Form_1.default.Control placeholder="1234 Main St" onChange={function (e) { return _this.updateAddress(e); }} required/>
                  <Form_1.default.Control.Feedback type="invalid">Please enter your street address.</Form_1.default.Control.Feedback>
               </Form_1.default.Group>

               <Form_1.default.Group controlId="address2">
                  <Form_1.default.Label>Address 2 (optional)</Form_1.default.Label>
                  <Form_1.default.Control placeholder="Apartment, studio, or floor" onChange={function (e) { return _this.updateAddress2(e); }}/>
               </Form_1.default.Group>

               <Form_1.default.Row>
                  <Form_1.default.Group as={Col_1.default} controlId="city" xs={12} md={6}>
                     <Form_1.default.Label>City</Form_1.default.Label>
                     <Form_1.default.Control onChange={function (e) { return _this.updateCity(e); }} required/>
                     <Form_1.default.Control.Feedback type="invalid">Please enter your city.</Form_1.default.Control.Feedback>
                  </Form_1.default.Group>

                  <Form_1.default.Group as={Col_1.default} controlId="state" xs={12} md={3}>
                     <Form_1.default.Label>State</Form_1.default.Label>
                     <StateOptions_jsx_1.default onChange={function (e) { return _this.updateState(e); }}/>
                     <Form_1.default.Control.Feedback type="invalid">Please select your state.</Form_1.default.Control.Feedback>
                  </Form_1.default.Group>

                  <Form_1.default.Group as={Col_1.default} controlId="zip" xs={12} md={3}>
                     <Form_1.default.Label>Zip</Form_1.default.Label>
                     <Form_1.default.Control pattern="^\d{5}$" onChange={function (e) { return _this.updateZip(e); }} required/>
                     <Form_1.default.Control.Feedback type="invalid">Please enter your zipcode.</Form_1.default.Control.Feedback>
                  </Form_1.default.Group>
               </Form_1.default.Row>

               <Form_1.default.Row>
                  <Form_1.default.Group as={Col_1.default} controlId="keywords" xs={12} md={6}>
                     <Form_1.default.Label>Keywords (optional)</Form_1.default.Label>
                     <Form_1.default.Control as="textarea" rows="3" cols="60" onChange={function (e) { return _this.updateKeywords(e); }}/>
                     <Form_1.default.Text className="text-muted">Separate your keywords by comma (e.g. "tacos, mexican food, burritos")</Form_1.default.Text>
                  </Form_1.default.Group>
                  <Form_1.default.Group as={Col_1.default} controlId="openingDaysAndTimes" xs={12} md={6}>
                     <Form_1.default.Label>Opening Days (optional)</Form_1.default.Label>
                     <Form_1.default.Group>
                        <Form_1.default.Check inline label="M" value="Monday" type="checkbox" onChange={function (e) { return _this.updateWeek(e); }}/>
                        <Form_1.default.Check inline label="T" value="Tuesday" type="checkbox" onChange={function (e) { return _this.updateWeek(e); }}/>
                        <Form_1.default.Check inline label="W" value="Wednesday" type="checkbox" onChange={function (e) { return _this.updateWeek(e); }}/>
                        <Form_1.default.Check inline label="T" value="Thursday" type="checkbox" onChange={function (e) { return _this.updateWeek(e); }}/>
                        <Form_1.default.Check inline label="F" value="Friday" type="checkbox" onChange={function (e) { return _this.updateWeek(e); }}/>
                        <Form_1.default.Check inline label="S" value="Saturday" type="checkbox" onChange={function (e) { return _this.updateWeek(e); }}/>
                        <Form_1.default.Check inline label="S" value="Sunday" type="checkbox" onChange={function (e) { return _this.updateWeek(e); }}/>
                     </Form_1.default.Group>
                     <Form_1.default.Label>Opening Hours (optional)</Form_1.default.Label>
                     <Form_1.default.Row>
                        <Form_1.default.Group as={Col_1.default} controlId="startTime" xs={6}>
                           <TimeOptions_jsx_1.default placeholder="Start Time" onChange={function (e) { return _this.updateStartTime(e); }}/>
                        </Form_1.default.Group>
                        <Form_1.default.Group as={Col_1.default} controlId="endTime" xs={6}>
                           <TimeOptions_jsx_1.default placeholder="End Time" onChange={function (e) { return _this.updateEndTime(e); }}/>
                        </Form_1.default.Group>
                     </Form_1.default.Row>
                  </Form_1.default.Group>
               </Form_1.default.Row>

               <Form_1.default.Row>
                  <Button_1.default className={Registration_css_1.default.button} variant="primary" type="submit">
                     Submit
                  </Button_1.default>
                  <Button_1.default className={Registration_css_1.default.button} variant="secondary" type="reset" onClick={this.handleClearForm}>
                     Reset
                  </Button_1.default>
               </Form_1.default.Row>
            </Form_1.default>
         </div>);
    };
    return Registration;
}(react_1.default.Component));
exports.default = Registration;
