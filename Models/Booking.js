const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
 city:{
     type:String,
     required:true,
     unique:true
 },
 date:{
    type:String,
    required:true, 
 },
 time:{
    type:String,
    required:true, 
 },
 email:{
    type:String,
    required:true,
 },
 phone:{
    type:String,
    required:false
 },
 photographer_name:{
    type:String,
    required:true
 },


},{timestamps:true})  //gives the created an dupdated at times //


module.exports = mongoose.model("Booking", BookingSchema)