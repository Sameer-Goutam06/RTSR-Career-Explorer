const mongoose = require('mongoose');
main()
    .then(() => {
        console.log("Career Schema connected");
    })
    .catch((err) => {
        console.log(err);
    });
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/RTSR');
}
//creating schema for career collection
const careerSchema=new mongoose.Schema({
    cname:String,
    cdesc:String,
    crequirements:String,
    csalary:Number,
    cgrowthrate:Number,
    cindustry:Array
});

export default careerSchema;