const mongoose = require("mongoose");

const PhotographerSchema = new mongoose.Schema({
 name:{
     type:String,
     required:true,
     unique:true
 },
 role:{
    type: String,
    required: true
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
   
 },
},{timestamps:true}) 

module.exports = mongoose.model("Photographer", PhotographerSchema);
