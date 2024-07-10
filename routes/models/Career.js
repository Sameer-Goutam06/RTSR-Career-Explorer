const mongoose = require('mongoose');
const Schema=mongoose.Schema;
// //creating schema for career collection
const careerSchema=new mongoose.Schema
(
    {
    cname:String,
    cdesc:String,
    crequirements:String,
    csalary:Number,
    cgrowthrate:Number,
    cindustry:Array,
    cvideo:String,
    carticle:String
    }
);

const Career=mongoose.model("Career",careerSchema);
module.exports=Career;