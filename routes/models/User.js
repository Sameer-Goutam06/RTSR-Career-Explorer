const mongoose = require('mongoose');
const Schema=mongoose.Schema;
// //creating schema for user collection
const userSchema=new mongoose.Schema
(
    {
        name:String,
        email:String,
        password:String,
        schooling:String,
        college:String,
        graduation:String,
        post_graduation:String,
        skills:[String],
        age:Number,
        hobbies:[String],
        gender:String
    }
);

const User=mongoose.model("User",userSchema);
module.exports=User;