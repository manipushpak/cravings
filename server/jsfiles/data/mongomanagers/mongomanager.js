"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var uri = 'mongodb://127.0.0.1:27017/Cravings';
mongoose.connect(uri, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log("ERROR");
        console.log(err.message);
    }
    else {
        console.log("Succesfully Connected!");
    }
});
;
exports.UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true }
});
var IUser = mongoose.model('User', exports.UserSchema);
exports.default = IUser;
