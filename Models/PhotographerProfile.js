const mongoose = require("mongoose")

const PhotographerProfileSchema = new mongoose.Schema({
   profilePic:{
     type:String,
     required:false,
     unique:false
 },
 name:{
    type:String,
    required:true,
     unique:false
 },
 city:{
   type:String,
   required:true,
    unique:false
},
project_number:{
    type:String,
    required:false,
 },
 following_number:{
   type:String,
   required:false,
},
follower_number:{
   type:String,
   required:false,
},
about_1:{
   type:String,
   required:false,
},
about_2:{
   type:String,
   required:false,
},
about_3:{
   type:String,
   required:false,
},
proj_1:{
   type:String,
   required:false,
},
proj_2:{
   type:String,
   required:false,
},
proj_3:{
   type:String,
   required:false,
},
proj_4:{
   type:String,
   required:false,
},

},{timestamps:true})  //gives the created an dupdated at times //


module.exports = mongoose.model("PhotographerProfile", PhotographerProfileSchema)