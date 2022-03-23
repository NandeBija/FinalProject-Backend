const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
 comment:{
     type:String,
     required:true,
 },
 photo:{
    type:String,
    required:false,
 },
},{timestamps:true})  //gives the created an dupdated at times //


module.exports = mongoose.model("Comment", CommentSchema)