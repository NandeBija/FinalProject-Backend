const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
name:{
    type:String,
    required:true
}

},{timestamps:true})  //gives the created an dupdated at times //


module.exports = mongoose.model("Category", CategorySchema)