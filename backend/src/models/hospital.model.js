const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
 hospital_name:{
    type:String,
 },
 hospital_adress:{
   type:String,
 },
 phoneNumber:{type:Number},
 email:{type:String},
 country:{
   type:String,
 },
 state:{
   type:String,
 },
 city:{
  type:String,
 },
 zip_code:{
   type:String
 },
 is_active:{
    type:Boolean,
    default:false,
 },
 hospital_logo:{
  public_id: { type: String },
  url: { type: String },
 },

});

const Hospital = mongoose.model('hospital', hospitalSchema);
module.exports = Hospital;