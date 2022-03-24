const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
 name:{
     type:String,
     required:true,
 },
 email:{
    type:String,
    required:true,
 },
 subject:{
    type:String,
    required:false,
 },
 message:{
    type:String,
    required:true,
 },
},{timestamps:true})  //gives the created an dupdated at times //


module.exports = mongoose.model("Contact", ContactSchema)