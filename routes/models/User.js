const mongoose = require('mongoose');
main()
    .then(() => {
        console.log("User schema connected");
    })
    .catch((err) => {
        console.log(err);
    });
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/RTSR');
}
//creating schema for user collection
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

export default userSchema;