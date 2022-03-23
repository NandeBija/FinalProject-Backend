const mongoose = require("mongoose")

const PhotographerProfileSchema = new mongoose.Schema({
 name:{
     type:String,
     required:true,
     unique:true
 },
 rate:{
    type:String,
    required:true,
 },
 services:{
    type:String,
    required:true,
 },
 projects:{
   type:Array,
   required:false
   
}

},{timestamps:true})  //gives the created an dupdated at times //


module.exports = mongoose.model("PhotographerProfile", PhotographerProfileSchema)