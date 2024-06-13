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
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});

//for a basic response
// app.get('/', function(req, res){
//     res.send("Welcome home");
// });
app.get("/",(req,res)=>
{
    res.render("home.ejs");
})