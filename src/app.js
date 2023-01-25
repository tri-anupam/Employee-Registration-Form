const express = require("express")
const path = require("path")
const app = express();
const port = process.env.PORT || 3000;


//Requiring database
const Employee = require("./models/registration")

//connect database
require("./db/conn")

//for json data on pages
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//serving files ejs
//loading static file
// app.use('../public',express.static('public'));
app.set("view engine","ejs");
app.use(express.static(__dirname+'../asset'))

// get index page
app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/register",(req,res)=>{
    res.render("register");
})

app.post("/register",async (req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password === cpassword){
            const employeeData = new Employee(req.body);
            const createEmployeeData = await employeeData.save();
            res.status(201).render("login")
        }else{
            res.send("password not matched.")
        }
    }catch(e){
        res.status(400).send(e);
    }
})

app.get("/login",(req,res)=>{
    res.render("login");
})
app.listen(port,()=>{
    console.log(`Connection successfull at port ${port}`);
})