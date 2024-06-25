const express= require('express');
const app = express();
//to set path even outside the ejs directory to run app globally
const path= require('path');
const port=8080;

//we need to create a folder nameed public to serve static files such as html,css,ejs..
app.use(express.static(path.join(__dirname,"../public/CSS")));
app.use(express.static(path.join(__dirname,"../public/JS")));

//using of ejs which is already installed in express folder hence we need to use it using app.set()
//view => templates
app.set("view engine", "ejs");

//setting path to run server globally and to avoid views loading from root directory when it is located in a leaf directory
app.set("views",path.join(__dirname,"../views"));

//to get the data from the post method
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({extended:true}));

//importing routes 
// const careerRoutes = require('./routes/careerRoutes');
// const profileRoutes = require('./routes/profileRoutes');

// // Use routes
// app.use('/careers', careerRoutes);
// app.use('/profile', profileRoutes);

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

//creating schema for career collection
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

//creating model for user collection
const User=mongoose.model("User",userSchema);

//Creating model for Career collection
const Career=mongoose.model("Career",careerSchema);

//port:8080
app.listen(port,()=>{
    console.log(`Web is running on localhost:${port}`);
});

//home route
app.get("/",(req,res)=>
{
    res.render("home.ejs",{logged:false,umail:undefined});
});

//careers route
app.get("/careers",(req,res)=>{
    res.render("industries.ejs",{port});
});

//Careers route
app.get("/industry/:industry",(req,res)=>{
    Career.find({cindustry:req.params.industry})
    .then((careers)=>
    {
        res.render("careers.ejs",{careers:careers,ind:req.params.industry});
    })
    .catch((err)=>{res.render("error.ejs",{data:err})});;
});

// individual career route
app.get("/career/:career",(req,res)=>{
    Career.find({cname:req.params.career})
    .then((results)=>
    {
        res.render("career.ejs",{data:results[0]});
    })
    .catch((err)=>
    {
        console.log(err);
        res.render("error.ejs",{data:err});
    });
});

//session method to pass data between pages
//registration route
app.get("/register",(req,res)=>{
    res.render("register.ejs",{logged:false});
});

//registration route to check if user exists before
app.post("/register",(req,res)=>
{
    let {username,email,password,confirmPassword}=req.body;
    let u={username,email,password};
    console.log(req.body);
    if (password !== confirmPassword) {
        return res.render('error.ejs', { data: 'Passwords do not match' });
    }
    User.findOne({name:u.username})
    .then((user)=>{
        if(user)
        {
            return res.render("error.ejs",{data:"User already exists"});
        }
        res.render("information.ejs",{u});
    })
    .catch((err)=>{
        console.log(err);
    });
});
app.post("/register/information",(req,res)=>{
    let {username,email,password,schoolGrade,collegeYear,graduationCourse,postGradCourse,skills,hobbies,age,gender}=req.body;
    let new_user={
        name:username,
        email:email,
        password:password,
        schooling:schoolGrade,
        college:collegeYear,
        graduation:graduationCourse,
        post_graduation:postGradCourse,
        skills:skills.split(","),
        hobbies:hobbies.split(","),
        age:age,
        gender:gender
        };
    User.insertMany([new_user])
    .then((result)=>
    {
        console.log(new_user);
        res.redirect("/login");
    })
    .catch((e)=>{
        console.log(e);
    });
});

// Login Route - GET request to render login form
app.get("/login", (req, res) => {
    res.render("login.ejs");
});

// Login Route - POST request to process login credentials
app.post("/login", (req, res) => {
    const {mail,password} = req.body;
    console.log(mail,"  ", password);
    User.findOne({email:mail})
        .then((user) => {
            if (!user) {
                return res.render("error.ejs", { data: "User doesn't exist" });
            }
            if (user.password !== password) {
                return res.render("error.ejs", { data: "Passwords don't match" });
            }
            res.render("home.ejs", { logged: true, umail: mail });
        })
        .catch((err) => {
            res.render("error.ejs", { data: err });
        });
});


// Profile Route - GET request to render user profile
app.get("/profile/:umail", (req, res) => {
    const { umail } = req.params;
    User.findOne({ email: umail })
        .then((user) => {
            if (!user) {
                return res.render("error.ejs", { data: "User not found" });
            }
            console.log(user);
            res.render("profile.ejs", { user: user });
        })
        .catch((err) => {
            res.render("error.ejs", { data: err });
        });
});

app.get("/logout",(req,res)=>{
    res.render("home.ejs",{logged:false,uname:undefined});
});