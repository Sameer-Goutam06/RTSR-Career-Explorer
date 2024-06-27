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
        password:String
    }
);

export default userSchema;