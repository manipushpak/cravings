import mongoose = require('mongoose');

// const uri: string = 'mongodb://127.0.0.1:27017/Cravings';

// mongoose.connect(uri, { useNewUrlParser: true }, (err: any) => {
//     if (err) {
//         console.log("ERROR");
//         console.log(err.message);
//     } else {
//         console.log("Succesfully Connected!"); 
//     }
// });

export interface IUser extends mongoose.Document {
    name:string; 
    email:string;
    password:string;
    phone:string;
}; 

export const UserSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    phone: {type:String, required: true}
});
  
const IUser = mongoose.model('User', UserSchema);
export default IUser;