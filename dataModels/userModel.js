/* For Defining User Schema Model */
/* first require Mongoose */


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,

    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

 
},{timestamps:true})

const UserModel = mongoose.model("UserData",userSchema);

module.exports= UserModel;