const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
 title:{
     type:String,
     required:true,
     unique:true
 },
//  username:{
//    type:String,
//    required:false,
   
// },
 description:{
    type:String,
    required:true,
    
 },
 photo:{
    type:String,
    required:false,
 },
 categories:{
    type:Array,
    required:false
    
 }

},{timestamps:true})  //gives the created an dupdated at times //


module.exports = mongoose.model("Post", PostSchema)