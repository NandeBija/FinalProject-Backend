const mongoose = require("mongoose");

const PhotographerSchema = new mongoose.Schema({
 name:{
     type:String,
     required:true,
     
 },
  img:{
     type:String,
     required:false,
 },
   
 insta_img:{
   type: String,
   required: false
},
facebook_img:{
   type: String,
   required: false
},
twitter_img:{
   type: String,
   required: false
},
insta_link:{
   type: String,
   required: false
},
facebook_link:{
   type: String,
   required: false
},
twitter_link:{
   type: String,
   required: false
},
role:{
   type: String,
   required: false
},
city:{
   type: String,
   required: false
},
project_number:{
   type: String,
   required: false
},
follower_number:{
   type: String,
   required: false
},
following_number:{
   type: String,
   required: false
},
about:{
   type: String,
   required: false
},
projects:{
   type: Array,
   required: false
},

 
 
},{timestamps:true}) 

module.exports = mongoose.model("Photographer", PhotographerSchema);
