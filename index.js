const express= require('express');
const app = express();
//to set path even outside the ejs directory to run app globally
const path= require('path');
const port=8080;

//we need to create a folder nameed public to serve static files such as html,css,ejs..
app.use(express.static(path.join(__dirname,"/public/CSS")));
app.use(express.static(path.join(__dirname,"/public/JS")));

//using of ejs which is already installed in express folder hence we need to use it using app.set()
//view => templates
app.set("view engine", "ejs");

//setting path to run server globally and to avoid views loading from root directory when it is located in a leaf directory
app.set("views",path.join(__dirname,"/views"));

//to get the data from the post method
app.use(express.urlencoded({extended:true}));

//importing mongoose
const mongoose = require('mongoose');
main()
    .then(() => {
        console.log("connected to database");
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

//creating schema for career collection
const careerSchema=new mongoose.Schema({
    cname:String,
    cdesc:String,
    crequirements:String,
    csalary:Number,
    cgrowthrate:Number,
    cindustry:String
});

//creating model for user collection
const User=mongoose.model("User",userSchema);

//creating model for career collection
const Career=mongoose.model("Career",careerSchema);
Career.insertMany(
).then((res)=>
{
    console.log("insertion successful");
})
.catch((err)=>console.log(err));
//port:8080
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});

//home route
app.get("/",(req,res)=>
{
    res.render("home.ejs",{port});
});

//careers route
app.get("/careers",(req,res)=>{
    res.render("careers.ejs",{port});
});

//Assessment Route
app.get("/assessment",(req,res)=>{
    res.render("assessment.ejs",{port});
});

//Login Route get request
app.get("/login",(req,res)=>{
    res.render("login.ejs",{port});
});

//Login Route post request to get data and check if user exists
app.post("/login",(req,res)=>
{
    console.log(req.body);
});

//registration route
app.get("/register",(req,res)=>{
    res.render("register.ejs",{port});
});

//registration route to check if user exists before
app.post("/register",(req,res)=>
{
    let {username,email,password,confirmPassword}=req.body;
    if (password !== confirmPassword) {
        return res.render('error.ejs', { data: 'Passwords do not match' });
    }
    else
    {

    }
});