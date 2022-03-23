const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true  //so that no user duplicates the same username//
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        required:false,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default: false
    }

},{timestamps:true})  //gives the created an dupdated at times //


module.exports = mongoose.model("User", UserSchema)